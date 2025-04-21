import React from "react";

export const ProductDetails = ({ product, quantity }) => {
  return (
    <div className="mb-8 p-4  rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Product Details
      </h2>
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src={product.image || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-gray-600">₹{product.price}</p>
          <p className="text-sm text-gray-500 mt-1">Quantity: {quantity}</p>
        </div>
      </div>
    </div>
  );
};