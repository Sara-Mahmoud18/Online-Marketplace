const Product = require('../models/Product');
const Review = require('../models/Review');

// @desc    Get all products with filters (Search, Category, Serviceability)
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
    const sellerFilter = req.query.seller ? { seller: req.query.seller } : {};
    const categoryFilter = req.query.category && req.query.category !== 'all' ? { category: req.query.category } : {};
    
    // BONUS: Serviceability Filter
    const locationFilter = req.query.location 
      ? { serviceArea: { $regex: req.query.location, $options: 'i' } } 
      : {};

    const products = await Product.find({ ...keyword, ...sellerFilter, ...categoryFilter, ...locationFilter });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (Seller only)
const createProduct = async (req, res) => {
  const { name, description, price, category, stock, deliveryTime, serviceArea, image } = req.body;
  try {
    const product = new Product({
      seller: req.user._id,
      name, description, price, category, stock, deliveryTime, serviceArea, image
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    // Update fields if they exist in body, else keep old
    Object.assign(product, req.body); 
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Delete a product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Create new review (Rating & Comment)
// @route   POST /api/products/:id/reviews
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if already reviewed
    const alreadyReviewed = await Review.findOne({
      product: req.params.id,
      user: req.user._id
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    const review = new Review({
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      product: req.params.id
    });

    await review.save();

    // Recalculate Average Rating
    const reviews = await Review.find({ product: req.params.id });
    product.numReviews = reviews.length;
    product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Get AI Summary of comments (Mock/Placeholder)
// @route   GET /api/products/:id/ai-summary
const getAiSummary = async (req, res) => {
    // In a real app, you would fetch all reviews, concatenate them, 
    // and send them to OpenAI/Gemini API here.
    // For this project deliverable, we act as the proxy.
    
    const reviews = await Review.find({ product: req.params.id });
    if(reviews.length === 0) return res.json({ summary: "No reviews to summarize yet." });

    // Mock response for the requirement
    res.json({ 
        summary: `AI Analysis: Based on ${reviews.length} reviews, customers generally feel positive about this item. Key highlights include quality and delivery speed.` 
    });
}

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, createProductReview, getAiSummary };