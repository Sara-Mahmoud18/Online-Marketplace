const Seller = require('../models/sellerModel');
const mongoose = require("mongoose");

// Flag a seller (buyer adds {sellerId, reason} to FlagS
exports.flagSeller = async (req, res) => {
  const { buyerId, sellerId, reason } = req.body;

  try {
    // Validate ObjectIds
    // if (!mongoose.Types.ObjectId.isValid(buyerId) ||
    //     !mongoose.Types.ObjectId.isValid(sellerId)) {
    //   return res.status(400).json({ message: "Invalid ID format" });
    // }
    // console.log(buyerId, sellerId, reason);
    // Find seller by _id
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(201).json({ message: 'Seller not found' });
    }

    if (!seller.FlagB) seller.FlagB = [];
    // console.log(seller.FlagB + "nice");
    // Proper ObjectId comparison
    const alreadyFlagged = seller.FlagB.some(
      entry => entry.buyerId.toString() === buyerId
    );

    if (alreadyFlagged) {
      return res.status(220).json({ message: 'You have already flagged this seller' });
    }
    // console.log("here");
    // seller.FlagB.push({
    //   buyerId,
    //   reason
    // });

    seller.FlagB.push({
      buyerId:new mongoose.Types.ObjectId(buyerId),
      reason
    });

    await seller.save();
    // await seller.updateOne({ _id: seller._id }, { $set: { FlagB: seller.FlagB } });

    res.status(200).json({ message: 'Seller flagged successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all sellers flagged by a buyer
exports.getFlaggedSellersByBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(buyerId)) {
    //   return res.status(400).json({ message: "Invalid buyer ID" });
    // }

    const flaggedSellers = await Seller.find({
      "FlagB.buyerId": buyerId
    });

    const result = flaggedSellers.map(seller => {
      const flag = seller.FlagB.find(f =>
        f.buyerId.toString() === buyerId
      );

      return {
        sellerId: seller._id,
        email: seller.email,
        reason: flag?.reason || "no reason"
      };
    });

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};