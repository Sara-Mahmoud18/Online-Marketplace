import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getSellerProducts, addProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/seller/products", auth, getSellerProducts);
router.post("/seller/products", auth, addProduct);

export default router;
