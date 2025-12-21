const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  FlagS: [{
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  reason: String
}],
},{ versionKey: false }, { timestamps: true });

module.exports = mongoose.model('Buyer', buyerSchema);