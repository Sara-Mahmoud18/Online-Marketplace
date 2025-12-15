const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addComment = async (req, res) => {
  try {
    const { userId, text } = req.body;

    const product = await Product.findById(req.params._id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.comments.push({ userId, text });
    await product.save();

    res.status(201).json({
      message: "Comment added",
      comments: product.comments,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addRating = async (req, res) => {
  try {
    const { rating } = req.body;

    const product = await Product.findById(req.params._id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.sum_rating += Number(rating);
    product.number_rating += 1;

    await product.save();

    res.status(201).json({
      message: "Rating added",
      averageRating: product.sum_rating / product.number_rating,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addComment,
  addRating,
};
