import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  estimated_DT: { type: Number, required: true },
  S_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  sum_rating: { type: Number, default: 0 },
  number_rating: { type: Number, default: 0 },
  image: String,
},{ versionKey: false }, { timestamps: true });

export default mongoose.model("Product", productSchema);
