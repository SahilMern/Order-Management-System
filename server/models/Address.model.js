import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
  },
  street: {
    type: String,
    required: [true, "Street address is required"],
    trim: true,
    maxlength: [100, "Street address cannot exceed 100 characters"]
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
    maxlength: [50, "City name cannot exceed 50 characters"]
  },
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
    maxlength: [50, "State name cannot exceed 50 characters"]
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
    match: [/^[0-9]{6}$/, "Please enter a valid 6-digit postal code"]
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    default: "India",
    trim: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },

  addressType: {
  type: String,
  enum: ["home", "work", "other"], // Only these exact values allowed
  default: "home"
},
  landmark: {
    type: String,
    trim: true,
    maxlength: [100, "Landmark cannot exceed 100 characters"]
  }
}, { timestamps: true });

// Ensure only one default address per user

export const Address = mongoose.model("Address", AddressSchema);
// AddressSchema.index({ user: 1, isDefault: 1 }, { unique: true, partialFilterExpression: { isDefault: true } });