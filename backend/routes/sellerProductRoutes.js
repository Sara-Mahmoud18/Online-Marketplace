import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getSellerProducts, addProduct , updateProduct ,deleteProduct  } from "../controllers/productController.js";

const router = express.Router();

router.get("/seller/products", auth, getSellerProducts);
router.post("/seller/products", auth, addProduct);
router.put("/seller/products/:id", auth, updateProduct);
router.delete("/seller/products/:id", auth, deleteProduct);

export default router;
