import Product from "../models/Product.js";
import Seller from "../models/Seller.js";

export const getSellerProducts = async (req, res) => {
  const products = await Product.find({ S_ID: req.sellerId });
  res.json(products);
};

export const addProduct = async (req, res) => {
  const seller = await Seller.findById(req.sellerId);
  if (seller.FlagB.length >= 5)
    return res.status(403).json({ message: "Restricted" });

  const product = await Product.create({
    ...req.body,
    S_ID: req.sellerId
  });

  res.status(201).json(product);
};
