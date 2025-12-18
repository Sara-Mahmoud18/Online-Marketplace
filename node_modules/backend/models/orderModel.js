const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  S_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  B_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
  Product: [{ type: String, required: true }],
  quantity: [{ type: Number, required: true }],
  Status: { type: String, required: true },
  total_price: { type: Number, required: true },
  Delivery_Date: { type: Date },
  Created_Date: { type: Date, default: Date.now }
},{ versionKey: false });

module.exports = mongoose.model('Order', orderSchema);