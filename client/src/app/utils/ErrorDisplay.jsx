"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

export const ErrorDisplay = ({ error, router }) => (
  <div className="text-center py-20 text-red-500">
    <p>Error loading product: {error}</p>
    <button 
      onClick={() => router.push('/products')}
      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
    >
      Back to Products
    </button>
  </div>
);