const Order = require('../models/orderModel');
const Products = require('../models/productModel');

// GET ORDERS BY BUYER
const getOrderByBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;
    // console.log("Fetching orders for buyer ID:", buyerId);
    const orders = await Order.find({ B_ID: buyerId })
      .populate("B_ID", "username email")
      .populate("S_ID", "email");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { Product, quantity } = req.body;

    for (let i = 0; i < Product.length; i++) {
      const productId = Product[i];
      const qtyToReduce = quantity[i];

      // if (!mongoose.Types.ObjectId.isValid(productId)) {
      //   return res.status(400).json({ message: "Invalid product ID" });
      // }

      const productDoc = await Products.findById(productId);

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

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getOrderByBuyer,
  createOrder,
};