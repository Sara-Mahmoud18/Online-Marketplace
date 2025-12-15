const mongoose = require("mongoose");
const Cart = require("../models/cartModel");


const getCart = async (req, res) => {
  try {
    const { buyerId } = req.params;

    let cart = await Cart.findOne({ buyerId });
    if (!cart) {
      cart = await Cart.create({ buyerId, items: [] });
    }

    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addToCart = async (req, res) => {
  try {
    const { buyerId } = req.params;

    const item = {
      S_ID: req.body.S_ID,
      Product: req.body.Product,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity) || 1,
      _id: new mongoose.Types.ObjectId(),
    };

    let cart = await Cart.findOne({ buyerId });
    if (!cart) {
      cart = await Cart.create({ buyerId, items: [] });
    }

    cart.items.push(item);
    await cart.save();

    res.status(201).json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const removeItem = async (req, res) => {
  const { buyerId, itemId } = req.params;

  try {
    const cart = await Cart.findOne({ buyerId });
    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await cart.save();
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const removeSellerItems = async (req, res) => {
  const { buyerId, sellerId } = req.params;

  try {
    const cart = await Cart.findOne({ buyerId });
    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.S_ID !== sellerId
    );

    await cart.save();
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeItem,
  removeSellerItems,
};
