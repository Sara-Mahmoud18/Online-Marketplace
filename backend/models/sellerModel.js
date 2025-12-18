const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: [String] },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  FlagB: [{
    buyerId: { type: String },
    reason: { type: String }
  }, { _id: false }],
}, { versionKey: false },{ timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);