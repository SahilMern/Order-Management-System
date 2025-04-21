"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

export const NotFound = ({ router }) => (
  <div className="text-center py-20">
    <p>Product not found</p>
    <button 
      onClick={() => router.push('/products')}
      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
    >
      Back to Products
    </button>
  </div>
);