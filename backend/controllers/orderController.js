import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Buyer from "../models/buyerModel.js";
import Product from "../models/productModel.js";

/**
 * GET /seller/orders
 */
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.sellerId;

    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorized: sellerId missing" });
    }

    // 1. Use .populate to automatically fetch Buyer and Product details
    const orders = await Order.find({ S_ID: sellerId })
      .populate("B_ID", "username")        // Get buyer name
      .populate("Product", "name price")   // Get product name and price
      .lean();

    // 2. Format the data to match what your frontend expects
    const formattedOrders = orders.map(order => ({
      ...order,
      buyerUsername: order.B_ID?.username || "Unknown",
      // Map products so you have a clean list
      products: order.Product || [] 
    }));

    res.json(formattedOrders);
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

    if (!sellerId) return res.status(401).json({ message: "Unauthorized" });

    // 1. Find the current order first to check its existing status
    const existingOrder = await Order.findOne({ _id: orderId, S_ID: sellerId });

    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2. DISABLE changing status if it's already "Delivered"
    if (existingOrder.Status === "Delivered") {
      return res.status(400).json({ message: "Delivered orders cannot be changed." });
    }

    // 3. Logic for setting Delivery Date
    const updateData = { Status: status };
    if (status === "Delivered") {
      updateData.Delivery_Date = new Date(); // Set current date
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId, S_ID: sellerId },
      updateData,
      { new: true }
    );

    res.json({ message: "Order updated", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};