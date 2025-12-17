const Buyer = require('../models/buyerModel');
const Seller = require('../models/sellerModel');

// Flag a seller (buyer adds {sellerId, reason} to FlagS
exports.flagSeller = async (req, res) => {
  const { buyerId, sellerId, reason } = req.body;
  try {
    const seller = await Seller.findOne({ id: sellerId });
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    // Ensure FlagB exists
    if (!seller.FlagB) seller.FlagB = [];

    // CHECK: Compare the string ID from the request to the 'id' in the array
    const alreadyFlagged = seller.FlagB.some(entry => String(entry.buyerId) === String(buyerId));

    if (alreadyFlagged) {
      return res.status(220).json({ message: 'You have already flagged this seller' });
    }

    // PUSH: Use 'id' explicitly
    seller.FlagB.push({ buyerId: buyerId, reason: reason });
    
    await seller.save();
    res.status(200).json({ message: 'Seller flagged successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all sellers flagged by a buyer
exports.getFlaggedSellersByBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;

    const flaggedSellers = await Seller.find({
      "FlagB.buyerId": buyerId
    });

    const result = flaggedSellers.map(seller => {
      const flag = seller.FlagB.find(f => f.buyerId === buyerId);

      return {
        sellerId: seller.id,
        email: seller.email,
        reason: flag?.reason || null
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};