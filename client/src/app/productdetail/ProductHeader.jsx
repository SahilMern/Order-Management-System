"use client"
import React from 'react';
import { FiStar } from 'react-icons/fi';

export const ProductHeader = ({ brand, name, rating, reviews, price, originalPrice, discount }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{brand}</h1>
      <h2 className="text-xl text-gray-600">{name}</h2>
      
      <div className="flex items-center mt-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">{reviews} reviews</span>
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">${price}</p>
        {originalPrice && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400 line-through">${originalPrice}</p>
            <span className="text-sm font-medium text-red-500">{discount} OFF</span>
          </div>
        )}
      </div>
    </div>
  );
};