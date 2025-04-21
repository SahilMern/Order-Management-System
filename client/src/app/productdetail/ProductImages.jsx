"use client"
import React from 'react';

export const ProductImages = ({ images, name }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square relative">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-contain p-4"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, index) => (
          <div key={index} className="bg-gray-100 rounded-md overflow-hidden aspect-square cursor-pointer relative">
            <img
              src={img}
              alt={`${name} ${index + 1}`}
              className="w-full h-full object-contain p-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};