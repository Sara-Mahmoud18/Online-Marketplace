import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  Price: Number,
  quantity: Number,
  sum_rating: Number,
  number_rating: Number,
  S_ID: String,
  estimated_DT: Date,
  image: String
}, { timestamps: true, versionKey: false });

export default mongoose.model("Product", productSchema);
