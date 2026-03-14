import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  location: String,
  quantity: Number
});

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  price: Number,

  stock: [StockSchema],

  reorderLevel: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);