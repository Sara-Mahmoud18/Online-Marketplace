const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  S_ID: String,
  Product: String,
  price: Number,
  quantity: Number
});

const cartSchema = new mongoose.Schema({
  buyerId: {
    type: String,
    required: true
  },
  items: [cartItemSchema]
},{ versionKey: false }, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
