"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { createOrder, fetchProduct } from "@/app/utils/api";
import { validateForm } from "@/app/utils/validation";
import { ProductDetails } from "../ProductDetails";
import { FormInput } from "../FormInput";
import { OrderSummary } from "../OrderSummary";
import { SubmitButton } from "../SubmitButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    customerName: user?.name || "",
    email: user?.email || "",
    contactNumber: "",
    shippingAddress: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState({});

  // Fetch product details
  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        const productData = await fetchProduct(id);
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch product"
        );
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm(formData);
    setErrors(validationErrors);

    if (!isValid || !product) return;

    try {
      const orderData = {
        customerName: formData.customerName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        shippingAddress: formData.shippingAddress,
        items: [
          {
            productId: product._id,
            quantity: formData.quantity,
          },
        ],
      };

      const response = await createOrder(orderData);
      toast.success("Order placed successfully!");
      setTimeout(() => {
        router.push(`/ordersuccess`);
      }, 2000);
    } catch (err) {
      toast.error(`Order failed: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500 gap-4">
        <p className="text-xl">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Product not found</p>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";
  const isLoggedIn = !!user;
  const isOutOfStock = product.quantity === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600 mb-6">Complete your purchase</p>

            <ProductDetails product={product} quantity={formData.quantity} />

            <form onSubmit={handleSubmit} noValidate>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Customer Information
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormInput
                  label="Full Name"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  error={errors.customerName}
                  placeholder="John Doe"
                />

                <FormInput
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@example.com"
                />

                <FormInput
                  label="Phone Number"
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  error={errors.contactNumber}
                  placeholder="9876543210"
                />

                <FormInput
                  label="Quantity"
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  error={errors.quantity}
                  min="1"
                  max="100"
                />

                <div className="sm:col-span-2">
                  <FormInput
                    label="Shipping Address"
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    error={errors.shippingAddress}
                    placeholder="123 Main St, City, State, PIN"
                    textarea
                  />
                </div>
              </div>

              <OrderSummary
                product={product}
                quantity={formData.quantity}
                isOutOfStock={isOutOfStock}
                isAdmin={isAdmin}
              />

              <SubmitButton
                isOutOfStock={isOutOfStock}
                isAdmin={isAdmin}
                isLoggedIn={isLoggedIn}
                handleSubmit={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProductPage;