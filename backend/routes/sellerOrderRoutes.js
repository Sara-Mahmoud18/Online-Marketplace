import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getSellerOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

// Get all orders for logged-in seller
router.get("/seller/orders", auth, getSellerOrders);

// Update order status for logged-in seller
router.put("/seller/orders/:orderId/status", auth, updateOrderStatus);

export default router;
