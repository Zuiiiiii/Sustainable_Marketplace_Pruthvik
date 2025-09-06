const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: String,
  description: String,
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  images: [String], // Array of image URLs (optional)
  condition: String,
  yearOfManufacture: Number,
  brand: String,
  model: String,
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  weight: Number,
  material: String,
  color: String,
  originalPackaging: {
    type: Boolean,
    default: false,
  },
  manualIncluded: {
    type: Boolean,
    default: false,
  },
  workingConditionDescription: String,
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
