const mongoose = require('mongoose');

const flagSchema = mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  target: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetEmail: { type: String }, 
  reason: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['seller_flagging_buyer', 'buyer_flagging_seller'], 
    required: true 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flag', flagSchema);
