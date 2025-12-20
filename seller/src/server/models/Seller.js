import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  email: String,
  phone: String,
  flagB: [
    {
      b_id: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
      reason: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);
