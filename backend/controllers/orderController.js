import Order from "../models/orderModel.js";
import Buyer from "../models/buyerModel.js";

/**
 * GET /seller/orders
 */
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ S_ID: req.sellerId })
      .populate("items.product", "name price")
      .lean();

    const ordersWithBuyer = await Promise.all(
      orders.map(async (order) => {
        const buyer = await Buyer.findById(order.B_ID).select("username");
        return {
          ...order,
          buyerUsername: buyer ? buyer.username : "Unknown"
        };
      })
    );

    res.json(ordersWithBuyer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /seller/orders/:orderId/status
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowed = ["Pending", "Shipped", "Delivered"];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findOneAndUpdate(
      { _id: orderId, S_ID: req.sellerId },
      { status },
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
