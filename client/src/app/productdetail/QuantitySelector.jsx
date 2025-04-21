"use client"
import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

export const QuantitySelector = ({ quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-900">Quantity:</h3>
      <div className="flex items-center gap-2">
        <button 
          onClick={decreaseQuantity}
          className="p-2 border rounded-md hover:bg-gray-50"
          disabled={quantity <= 1}
        >
          <FiMinus className="w-4 h-4" />
        </button>
        <span className="w-10 text-center">{quantity}</span>
        <button 
          onClick={increaseQuantity}
          className="p-2 border rounded-md hover:bg-gray-50"
          disabled={quantity >= 10}
        >
          <FiPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};