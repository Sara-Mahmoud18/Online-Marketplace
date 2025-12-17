const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: String },
  text: { type: String },
  date: { type: Date, default: Date.now }
});

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
  comments: [commentSchema],
  serviceArea: [String],
  Status: { type: String, default: "pending" },
},{ versionKey: false }, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
