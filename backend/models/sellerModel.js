const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  FlagB: [{
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
    reason: { type: String }
  }, { _id: false }],
}, { versionKey: false },{ timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);