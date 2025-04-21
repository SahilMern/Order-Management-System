"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

export const LoginModal = ({ showLoginModal, setShowLoginModal }) => {
  const router = useRouter();
  
  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 bg-[#f9f4f4ee] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Login Required</h3>
        <p className="mb-4">You need to login to add items to your cart.</p>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="flex-1 bg-black text-white py-2 px-4 rounded-md"
          >
            Login
          </button>
          <button
            onClick={() => setShowLoginModal(false)}
            className="flex-1 bg-gray-200 text-black py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};