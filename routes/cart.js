const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// GET cart items for a user
router.get('/:userId',async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) return res.json({ products: [] });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST add item to cart
router.post('/:userId',async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // No cart exists, create new
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // SAFETY: ensure products is an array
      if (!cart.products) cart.products = [];

      // Cart exists, check if product exists already
      const productIndex = cart.products.findIndex(
        p => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        // Product exists, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // New product, push to array
        cart.products.push({ productId, quantity });
      }
    }

    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});


// DELETE remove product from cart
router.delete('/:userId/:productId',async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    if (!cart.products) cart.products = [];

    cart.products = cart.products.filter(
      p => p.productId.toString() !== productId
    );

    await cart.save();

    res.json({ message: 'Product removed from cart', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove product from cart' });
  }
});

router.put('/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // SAFETY: Ensure products array exists
    if (!cart.products) cart.products = [];

    const productIndex = cart.products.findIndex(
      p => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.products[productIndex].quantity = quantity;

    const savedCart = await cart.save();

    res.json(savedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product quantity' });
  }
});


module.exports = router;
