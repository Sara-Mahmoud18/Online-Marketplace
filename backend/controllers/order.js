const Order = require('../models/orderModel');
const Product = require('../models/productModel').default;

// GET ORDERS BY BUYER
const getOrderByBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;

    const orders = await Order.find({ B_ID: buyerId })
      .populate("S_ID", "email")
      .populate("Product", "name");

    const formattedOrders = orders.map(order => {
      const orderObj = order.toObject();
      
      return {
        ...orderObj,
        // No more .flat() needed! Just map the populated products to their names.
        // We add a check (p && p.name) to handle deleted products.
        Product: orderObj.Product.map(p => (p && p.name) ? p.name : "Unknown Product"),
        // quantity is already a flat array of numbers [1, 2]
        quantity: orderObj.quantity 
      };
    });

    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { Product: productIds, quantity } = req.body;

    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const qtyToReduce = quantity[i];

      const productDoc = await Product.findById(productId);

      if (!productDoc || productDoc.quantity < qtyToReduce) {
        return res.status(400).json({
          message: `Insufficient stock for product`
        });
      }

      productDoc.quantity -= qtyToReduce;
      await productDoc.save();
    }

    const order = new Order(req.body);
    const savedOrder = await order.save();

    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("S_ID", "email")
      .populate("Product", "name");

    const orderObj = populatedOrder.toObject();

    const formattedOrder = {
      ...orderObj,
      Product: orderObj.Product.map(p => (p && p.name) ? p.name : "Unknown Product"),
      quantity: orderObj.quantity
    };

    res.status(201).json(formattedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = {
  getOrderByBuyer,
  createOrder,
};