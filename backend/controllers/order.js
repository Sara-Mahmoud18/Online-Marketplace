const Order = require('../models/orderModel');
const Products = require('../models/productModel');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new order
const createOrder = async (req, res) => {
  try {
    const { Product, quantity } = req.body;

    // 1. Loop through products to check and update stock
    for (let i = 0; i < Product.length; i++) {
      const productName = Product[i];
      const qtyToReduce = quantity[i];

      const productDoc = await Products.findOne({ name: productName });

      if (!productDoc || productDoc.stock < qtyToReduce) {
        return res.status(400).json({ message: `Insufficient stock for ${productName} please remove the item` });
      }

      // 2. Decrement the stock
      productDoc.stock -= qtyToReduce;
      await productDoc.save();
    }

    // 3. Save the order
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
};
