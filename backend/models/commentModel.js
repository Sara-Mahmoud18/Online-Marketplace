const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, 
  b_id: { type: String, required: true },     
  date: { type: Date, default: Date.now }      
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);