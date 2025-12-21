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
      // Products in stock
      { $match: { quantity: { $gt: 0 } } },

      // Join seller
      {
        $lookup: {
          from: "sellers",
          localField: "S_ID",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },

      // Seller location filter
      { $match: { "seller.location": buyer.location } },

      // Lookup delivered orders for this buyer & product
      {
        $lookup: {
          from: "orders",
          let: {
            productId: "$_id",
            buyerId: buyer._id,
          },
          pipeline: [
            // Match buyer
            {
              $match: {
                $expr: {
                  $eq: ["$B_ID", "$$buyerId"],
                },
              },
            },

            // Match delivered only (CORRECT field name)
            {
              $match: {
                Status: "Delivered",
              },
            },

            // Flatten Product array: [[ObjectId]] → [ObjectId]
            {
              $addFields: {
                flatProducts: {
                  $reduce: {
                    input: "$Product",
                    initialValue: [],
                    in: { $concatArrays: ["$$value", "$$this"] },
                  },
                },
              },
            },

            // Check if current product exists in flattened array
            {
              $match: {
                $expr: {
                  $in: ["$$productId", "$flatProducts"],
                },
              },
            },
          ],
          as: "previousOrders",
        },
      },

      // orderedBefore flag
      {
        $addFields: {
          orderedBefore: {
            $gt: [{ $size: "$previousOrders" }, 0],
          },
        },
      },

      // Cleanup
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