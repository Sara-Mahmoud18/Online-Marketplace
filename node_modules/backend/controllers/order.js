const Order = require('../models/orderModel');
const Products = require('../models/productModel');

// Get order by ID
const getOrderByBuyer = async (req, res) => {
  try {
    const order = await Order.find({ B_ID: req.params.Bid });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new order
const createOrder = async (req, res) => {
  try {
    // console.log("Order Data:", req.body);

    const { Product, quantity } = req.body;

    // 1. Loop through products to check and update quantity
    for (let i = 0; i < Product.length; i++) {
      const productName = Product[i];
      const qtyToReduce = quantity[i];

      const productDoc = await Products.findOne({ name: productName });

      if (!productDoc || productDoc.quantity < qtyToReduce) {
        return res.status(400).json({ message: `Insufficient stock for ${productName} please remove the item` });
      }

      // 2. Decrement the quantity
      productDoc.quantity -= qtyToReduce;
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


module.exports = {
  getOrderByBuyer,
  createOrder,
};
