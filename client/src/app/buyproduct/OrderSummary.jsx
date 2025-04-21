import React from "react";

export const OrderSummary = ({ product, quantity, isOutOfStock, isAdmin }) => {
  const subtotal = product.price * quantity;
  const total = subtotal;

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">₹0.00</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      {isOutOfStock && (
        <p className="mt-2 text-red-600 text-sm font-medium">Out of stock</p>
      )}
    </div>
  );
};