"use client"
import React from 'react';

export const ProductFeatures = ({ features }) => {
  return (
    <div className="grid grid-cols-2 gap-2 py-4 border-t border-b border-gray-200">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <span className="text-sm text-gray-600">{feature}</span>
        </div>
      ))}
    </div>
  );
};