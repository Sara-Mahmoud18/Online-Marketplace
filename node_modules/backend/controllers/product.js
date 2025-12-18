const mongoose = require("mongoose");
const Product = require("../models/productModel");
const Buyer = require("../models/buyerModel");

const getAllProducts = async (req, res) => {
  try {
    const { buyerId } = req.params;

    const buyer = await Buyer.findById(buyerId);
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });

    const products = await Product.aggregate([
      { $match: { quantity: { $gt: 0 } } },

      // Join seller info
      {
        $lookup: {
          from: "sellers",
          localField: "S_ID",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },

      // Only sellers in the buyer's location
      { $match: { "seller.location": buyer.location } },

      // Join orders for this buyer
      {
        $lookup: {
          from: "orders",
          let: { productId: "$_id" },
          pipeline: [
            { $match: { B_ID: buyer._id } },
            { $project: { Product: 1 } },
            {
              $match: {
                $expr: { $in: ["$$productId", "$Product"] },
              },
            },
          ],
          as: "previousOrders",
        },
      },

      // Add a flag if the buyer ordered this product
      {
        $addFields: {
          orderedBefore: { $gt: [{ $size: "$previousOrders" }, 0] },
        },
      },

      // Remove fields we don't want to return
      { $project: { seller: 0, previousOrders: 0 } },
    ]);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ message: "Invalid product ID" });
    // }

    const product = await Product.findById(productId)
      .populate("S_ID", "email location");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating } = req.body;

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ message: "Invalid product ID" });
    // }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

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
  addRating,
};