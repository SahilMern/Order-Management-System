"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiShoppingBag } from 'react-icons/fi';
import { useSelector } from 'react-redux';

export const ProductCard = ({ product }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  
  const isAdmin = user?.role === 'admin';

  const handleCardClick = (e) => {
    if (e.target.closest('button') && !isAdmin) return;
    router.push(`/productdetail/${product._id}`);
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    if (!isAdmin) router.push(`/buyproduct/${product._id}`);
  };

  return (
    <div 
      className="rounded-lg overflow-hidden w-full bg-[#f5f4f4] flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative pt-[100%] sm:pt-[110%] md:pt-[100%]">
        <img 
          src={product.image || '/placeholder-product.jpg'} 
          alt={product.name || 'Product image'}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Cart Icon */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white rounded-full shadow-sm sm:shadow">
          <FiShoppingCart className="text-gray-600 h-3 w-3 sm:h-4 sm:w-4" />
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-grow">
        {/* Brand */}
        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base mb-1 line-clamp-1">
          {product.brand || 'Brand'}
        </h3>
        
        {/* Product Name */}
        <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 h-[32px] sm:h-[40px]">
          {product.name || 'Product Name'}
        </p>
        
        {/* Price and Buy Button */}
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-gray-900 text-sm sm:text-base">
            SAR {product.price?.toFixed(2) || '00.00'}
          </span>
          <button 
            className={`px-2 py-1 sm:px-3 sm:py-1 text-white text-xs sm:text-sm rounded flex items-center gap-0.5 sm:gap-1 transition-colors ${
              isAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
            onClick={handleBuyClick}
            disabled={isAdmin}
            aria-label={isAdmin ? "Admin cannot buy products" : "Buy this product"}
          >
            <FiShoppingBag className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> 
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};