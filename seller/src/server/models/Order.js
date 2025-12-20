import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  S_ID: String,
  B_ID: String,
  Cart: [
    {
      itemId: String,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  Status: { type: String, default: "Pending" },
  payment_method: String,
  total_price: Number,
  Delivery_Date: Date,
  Created_Date: { type: Date, default: Date.now }
}, { versionKey: false });

export default mongoose.model("Order", orderSchema);
