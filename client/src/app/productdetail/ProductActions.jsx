"use client";
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export const ProductActions = ({ 
  productId,
  handleAddToCart, 
  isLoggedIn,
  setShowLoginModal
}) => {
  const router = useRouter();

  const handleBuyNow = () => {
    if (isLoggedIn) {
      router.push(`/buyproduct/${productId}`);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={isLoggedIn ? handleAddToCart : () => setShowLoginModal(true)}
        className="flex-1 bg-white border border-black text-black py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <FiShoppingCart />
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="flex-1 bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
      >
        Buy Now
      </button>
    </div>
  );
};