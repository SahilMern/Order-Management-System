"use client"
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { productUrl } from "@/app/helper/BackendUrl";
import { useAdminAuth } from "@/app/hooks/useAdminAuth";

const AddProducts = () => {
  useAdminAuth();
  const categories = [
    "Shirt",
    "Jeans",
    "T-Shirt",
    "Shoes",
    "Jacket",
  ];


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "1",
    category: "",
    quantity: "1",
  });

  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (errors.image) {
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
      isValid = false;
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 1) {
      newErrors.price = "Price must be at least 1";
      isValid = false;
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    // Quantity validation
    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
      isValid = false;
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) < 1) {
      newErrors.quantity = "Quantity must be at least 1";
      isValid = false;
    }

    // Image validation
    if (!selectedFile) {
      newErrors.image = "Product image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all validation errors", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("quantity", formData.quantity);
      data.append("image", selectedFile);

      const response = await axios.post(`${productUrl}/addProduct`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 5000,
      });

      // Reset form but keep default values
      setFormData({
        name: "",
        description: "",
        price: "1",
        category: "",
        quantity: "1",
      });
      setSelectedFile(null);
      setErrors({});

    } catch (error) {
      console.error("Error adding product:", error);
      let errorMessage = "Failed to add product";
      
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 413) {
          errorMessage = "File size too large";
        }
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`p-4 mt-1 block w-full rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className={`p-4 mt-1 block w-full rounded-md ${
                errors.description ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border`}
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price Field */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="1"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={`p-4 mt-1 block w-full rounded-md ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border appearance-none`}
                onWheel={(e) => e.target.blur()}
                required
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            {/* Quantity Field */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity*
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className={`p-4 mt-1 block w-full rounded-md ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border appearance-none`}
                onWheel={(e) => e.target.blur()}
                required
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
              )}
            </div>
          </div>

          {/* Category Field */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`p-4 mt-1 block w-full rounded-md ${
                errors.category ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border`}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Image Field */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Product Image*
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
              required
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default AddProducts;