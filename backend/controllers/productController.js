import Product from '../models/productModel.js';
import Seller from "../models/sellerModel.js";

export const getSellerProducts = async (req, res) => {
  const products = await Product.find({ S_ID: req.sellerId });
  res.json(products);
};

export const addProduct = async (req, res) => {
  try {
    console.log("sellerId:", req.sellerId);
    console.log("req.body:", req.body);

    const seller = await Seller.findById(req.sellerId);
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const product = await Product.create({ ...req.body, S_ID: req.sellerId });
    res.status(201).json(product);
  } catch (err) {
    console.error("Add product error:", err); // ده هيوريك السبب الحقيقي
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


