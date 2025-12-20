import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  email: String,
  phone: String,
  FlagS: [
    {
      Sellerid: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
      reason: String
    }
  ]
}, { timestamps: true, versionKey: false });

export default mongoose.model("Buyer", buyerSchema);
