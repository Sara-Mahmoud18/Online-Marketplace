const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  orderItems: [{
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'Product' 
    }
  }],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  // Snapshots for UI display
  buyerEmail: { type: String }, 
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);