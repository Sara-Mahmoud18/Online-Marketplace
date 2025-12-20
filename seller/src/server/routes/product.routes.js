import express from "express";
import Product from "../models/Product.js";
import Seller from "../models/Seller.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  // GET /seller/products
});

router.post("/", auth, async (req, res) => {
  // POST /seller/products
});

router.put("/:id", auth, async (req, res) => {
  // UPDATE product
});

router.delete("/:id", auth, async (req, res) => {
  // DELETE product
});

export default router;
