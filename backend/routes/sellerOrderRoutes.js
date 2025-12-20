import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getSellerOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/seller/orders", auth, getSellerOrders);
router.put("/seller/orders/:orderId/status", auth, updateOrderStatus);

export default router;
