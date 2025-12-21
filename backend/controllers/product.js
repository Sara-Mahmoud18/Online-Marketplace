const mongoose = require("mongoose");
const Product = require('../models/productModel').default;
const Buyer = require("../models/buyerModel");

const getAllProducts = async (req, res) => {
  try {
    const { buyerId } = req.params;

    const buyer = await Buyer.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    const products = await Product.aggregate([
      { $match: { quantity: { $gt: 0 } } },
      {
        $lookup: {
          from: "sellers",
          localField: "S_ID",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      { $match: { "seller.location": buyer.location } },
      {
        $lookup: {
          from: "orders",
          let: { productId: "$_id", buyerId: buyer._id },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$B_ID", "$$buyerId"] },
                    { $eq: ["$Status", "Delivered"] },
                    { $in: ["$$productId", "$Product"] } // Fixed: Simplified for flat array
                  ]
                }
              }
            }
          ],
          as: "previousOrders",
        },
      },
      {
        $addFields: {
          orderedBefore: { $gt: [{ $size: "$previousOrders" }, 0] },
        },
      },
      {
        $project: {
          seller: 0,
          previousOrders: 0,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
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