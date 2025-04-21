"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserShield } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/app/store/slices/authSlice";
import {
  FiMenu,
  FiX,
  FiHeart,
  FiShoppingCart,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authUrl } from "@/app/helper/BackendUrl";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [cartItems] = useState(3);
  const [wishlistItems] = useState(2);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Make API call to logout endpoint
      await axios.post(`${authUrl}/logout`, {}, {
        withCredentials: true
      });
      
      // Clear client-side state
      dispatch(clearUser());
      
      // Show success message
      toast.success("Logged out successfully");
      
      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/products", label: "PRODUCTS" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className="border-b border-[#d6d1d1] py-2">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-3xl font-extrabold text-gray-900 tracking-tight"
            >
              ShopEasy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  >
                    <FaUserShield className="h-4 w-4 mr-1" />
                    DASHBOARD
                  </Link>
                )}
                {user.role === "user" && (
                  <>
                    <Link
                      href="/wishlist"
                      className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                      <FiHeart className="h-4 w-4" />
                      <span className="ml-1 text-xs">({wishlistItems})</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center text-gray-700 hover:text-blue-600 ml-2"
                    >
                      <FiShoppingCart className="h-4 w-4" />
                      <span className="ml-1 text-xs">({cartItems})</span>
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    "Logging out..."
                  ) : (
                    <>
                      <FiLogOut className="h-4 w-4 inline mr-1" />
                      LOGOUT
                    </>
                  )}
                </button>
                <div
                  className="flex items-center text-gray-700 text-sm cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  <FiUser className="h-4 w-4 mr-1" />
                  <span>Profile</span>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/wishlist"
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <FiHeart className="h-4 w-4" />
                  <span className="ml-1 text-xs">(0)</span>
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center text-gray-700 hover:text-blue-600 ml-2"
                >
                  <FiShoppingCart className="h-4 w-4" />
                  <span className="ml-1 text-xs">(0)</span>
                </Link>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium border border-gray-300 rounded-md ml-2"
                >
                  LOGIN
                </Link>
                <Link
                  href="/register"
                  className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 text-sm font-medium rounded-md ml-2"
                >
                  REGISTER
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 pt-2">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      href="/dashboard"
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUserShield className="mr-2 h-4 w-4" />
                      DASHBOARD
                    </Link>
                  )}
                  {user.role === "user" && (
                    <>
                      <Link
                        href="/wishlist"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiHeart className="mr-2 h-4 w-4" />
                        WISHLIST ({wishlistItems})
                      </Link>
                      <Link
                        href="/cart"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiShoppingCart className="mr-2 h-4 w-4" />
                        CART ({cartItems})
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      "Logging out..."
                    ) : (
                      <>
                        <FiLogOut className="mr-2 h-4 w-4" />
                        LOGOUT
                      </>
                    )}
                  </button>
                  <div 
                    className="flex items-center px-3 py-2 text-gray-700 text-sm cursor-pointer"
                    onClick={() => {
                      router.push("/profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <FiUser className="mr-2 h-4 w-4" />
                    <span>{user.name}</span>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/wishlist"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiHeart className="mr-2 h-4 w-4" />
                    WISHLIST (0)
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiShoppingCart className="mr-2 h-4 w-4" />
                    CART (0)
                  </Link>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    LOGIN
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    REGISTER
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;