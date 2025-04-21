"use client";
import React from "react";

export const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => {
  console.log(sizes);
  
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-900">Size:</h3>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-2 border rounded-md text-sm font-medium ${
              selectedSize === size
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
