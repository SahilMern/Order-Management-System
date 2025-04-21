"use client";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import Image from "next/image";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/products');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden text-center">
        <div className="relative h-48">
          <Image
            src="/sucess.png"
            alt="Order success"
            fill
            className="object-contain p-6 rounded-3xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-center mb-5">
            <FaCheckCircle className="text-6xl text-green-500 animate-bounce" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. We've sent a confirmation to your email.
          </p>

          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full">
              <span className="text-indigo-700 font-medium">
                Order #{(Math.random() + 1).toString(36).substring(7).toUpperCase()}
              </span>
            </div>
          </div>

          <button
            onClick={() => router.push('/products')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300"
          >
            <FaShoppingBag />
            Continue Shopping
          </button>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
          Need help? <a href="#" className="text-indigo-600 hover:underline">Contact us</a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;