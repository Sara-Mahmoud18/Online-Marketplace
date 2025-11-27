const mongoose = require('mongoose');

// Handling "Rate items" and "Add comments" requirements
const reviewSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true }, // Buyer name
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);