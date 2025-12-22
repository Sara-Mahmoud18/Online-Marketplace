const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  S_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  Product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true
  },
  items: [cartItemSchema]
},{ versionKey: false }, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
