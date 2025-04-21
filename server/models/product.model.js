import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
    index: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be positive"],
    index: true,
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    trim: true,
    index: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity cannot be negative"],
    default: 0,
    index: true,
  },
  image: {
    type: String,
    required: [true, "Product image is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: -1,
  },
});

// Text index for search
ProductSchema.index({ name: "text", description: "text" });

// Compound index for common queries
ProductSchema.index({ category: 1, price: 1, quantity: 1 });

export const Product = mongoose.model("Product", ProductSchema);
