const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
      }
    ],
    default: []
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
