import Seller from "../models/sellerModel.js";
import Buyer from "../models/buyerModel.js";
import Order from "../models/orderModel.js";

/**
 * GET /seller/profile
 */
export const getProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.sellerId).select("-password");
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.json(seller);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /seller/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      req.sellerId,
      req.body,
      { new: true, runValidators: true, select: "-password" }
    );
    res.json(updatedSeller);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /seller/status
 */
export const getStatus = async (req, res) => {
  try {
    const seller = await Seller.findById(req.sellerId);
    const flags = seller.FlagB.length;

    let status = "NORMAL";
    if (flags >= 7) status = "BANNED";
    else if (flags >= 5) status = "SUSPENDED";
    else if (flags >= 3) status = "RESTRICTED";

    res.json({ flags, status });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /seller/flags
 */
export const getFlaggedBuyers = async (req, res) => {
  try {
    const seller = await Seller.findById(req.sellerId)
      .populate("FlagB.b_id", "username email phone");

    if (!seller) return res.status(404).json({ message: "Seller not found" });

    res.json(seller.FlagB);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /seller/flag-buyer
 */
export const flagBuyer = async (req, res) => {
  try {
    const { orderId, reason } = req.body;
    if (!orderId || !reason)
      return res.status(400).json({ message: "Order ID & reason required" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const buyer = await Buyer.findById(order.B_ID);
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });

    const alreadyFlagged = buyer.FlagS.some(
      f => f.Sellerid.toString() === req.sellerId
    );
    if (alreadyFlagged)
      return res.status(400).json({ message: "Buyer already flagged" });

    buyer.FlagS.push({ Sellerid: req.sellerId, reason });
    await buyer.save();

    res.json({ message: "Buyer flagged successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /seller/remove-flag
 */
export const removeFlag = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId)
      return res.status(400).json({ message: "Order ID required" });

    const order = await Order.findById(orderId);
    const buyer = await Buyer.findById(order.B_ID);

    const index = buyer.FlagS.findIndex(
      f => f.Sellerid.toString() === req.sellerId
    );

    if (index === -1)
      return res.status(400).json({ message: "No flag found" });

    buyer.FlagS.splice(index, 1);
    await buyer.save();

    res.json({ message: "Flag removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
