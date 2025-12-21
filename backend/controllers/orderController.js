import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Buyer from "../models/buyerModel.js";
import Product from "../models/productModel.js"; // 🔴 REQUIRED

/**
 * GET /seller/orders
 */
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.sellerId;
    console.log("sellerId:", sellerId);

    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorized: sellerId missing" });
    }

    const orders = await Order.find({ S_ID: sellerId }).lean();

    const ordersWithBuyer = await Promise.all(
      orders.map(async (order) => {
        // ---------------- Buyer ----------------
        let buyerUsername = "Unknown";
        if (order.B_ID && mongoose.Types.ObjectId.isValid(order.B_ID)) {
          const buyer = await Buyer.findById(order.B_ID).select("username");
          if (buyer) buyerUsername = buyer.username;
        }

        // ---------------- Products (array of arrays) ----------------
        const products = await Promise.all(
          order.Product.map(async (prodArray) =>
            Promise.all(
              prodArray.map(async (prodId) =>
                Product.findById(prodId).select("name price")
              )
            )
          )
        );

        return {
          ...order,
          products,
          buyerUsername
        };
      })
    );

    res.json(ordersWithBuyer);
  } catch (err) {
    console.error("Error in getSellerOrders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


/**
 * PUT /seller/orders/:orderId/status
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const sellerId = req.sellerId;

    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const allowed = ["Pending", "Shipped", "Delivered"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // 🔴 MUST update "Status" (capital S)
    const order = await Order.findOneAndUpdate(
      { _id: orderId, S_ID: sellerId },
      { Status: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order updated", order });
  } catch (err) {
    console.error("Error in updateOrderStatus:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};