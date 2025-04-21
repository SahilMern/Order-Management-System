import React from "react";
import { useRouter } from "next/navigation";

export const SubmitButton = ({
  isOutOfStock,
  isAdmin,
  isLoggedIn,
  handleSubmit,
}) => {
  const router = useRouter();

  if (isAdmin) {
    return (
      <button
        type="button"
        className="w-full mt-6 bg-gray-400 cursor-not-allowed text-white font-medium py-3 px-4 rounded-md shadow-sm"
        disabled
      >
        Admin cannot place orders
      </button>
    );
  }

  if (!isLoggedIn) {
    return (
      <button
        type="button"
        onClick={() => router.push("/login")}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Login to Place Order
      </button>
    );
  }

  return (
    <button
      type="submit"
      className={`w-full mt-6 ${
        isOutOfStock
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white font-medium py-3 px-4 rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isOutOfStock ? "" : "focus:ring-blue-500"
      }`}
      disabled={isOutOfStock}
      onClick={!isOutOfStock ? handleSubmit : undefined}
    >
      Place Order
    </button>
  );
};