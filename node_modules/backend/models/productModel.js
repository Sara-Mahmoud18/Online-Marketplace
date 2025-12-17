const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  P_ID: String,              
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  quantity: Number,
  category: String,
  estimated_DT: Number,
  S_ID: String,
  sum_rating: { type: Number, default: 0 },
  number_rating: { type: Number, default: 0 },
  image: String,
},{ versionKey: false }, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
