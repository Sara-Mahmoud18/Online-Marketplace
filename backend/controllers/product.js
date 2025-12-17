const Product = require("../models/productModel");
const Buyer = require("../models/buyerModel");

const getAllProducts = async (req, res) => {
  try {
    // console.log(req.params.id);

    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    const buyerLocation = buyer.location;

    const products = await Product.aggregate([
      { $match: { quantity: { $gt: 0 } } },

      {
        $lookup: {
          from: "sellers",
          localField: "S_ID",
          foreignField: "id",
          as: "seller"
        }
      },
      { $unwind: "$seller" },

      {
        $match: {
          "seller.location": buyerLocation
        }
      },

      {
        $project: { seller: 0 }
      }
    ]);

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
  // addComment,
  addRating,
};
