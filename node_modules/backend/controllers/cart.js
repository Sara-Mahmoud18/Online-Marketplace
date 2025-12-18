const Cart = require("../models/cartModel");
const Seller = require("../models/sellerModel");

// GET CART
const getCart = async (req, res) => {
  try {
    const { buyerId } = req.params;

    let cart = await Cart.findOne({ buyerId })
      .populate("items.Product", "name")   // product name
      .populate("items.S_ID", "email");    // seller email
    if (!cart) {
      cart = await Cart.create({ buyerId, items: [] });
    }

    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { buyerId } = req.params; // ✅ fixed
    const { S_ID, Product, price, quantity } = req.body;

    const item = {
      S_ID,
      Product,
      price: Number(price),
      quantity: Number(quantity) || 1,
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

// REMOVE ITEM
const removeItem = async (req, res) => {
  const { buyerId, itemId } = req.params;

  try {
    const cart = await Cart.findOne({ buyerId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => !item._id.equals(itemId)
    );

    await cart.save();
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE SELLER ITEMS
const removeSellerItems = async (req, res) => {
  const { buyerId, sellerId } = req.params;

  try {
    // if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    //   return res.status(400).json({ message: "Invalid seller ID" });
    // }

    const cart = await Cart.findOne({ buyerId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => !item.S_ID.equals(sellerId)
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