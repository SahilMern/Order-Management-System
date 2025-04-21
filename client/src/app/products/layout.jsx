"use client";
import React, { useState, useEffect } from "react";
import ProductSidebar from "./ProductSidebar";
import { FiX, FiFilter } from "react-icons/fi";

const Layout = ({ children }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 p-8">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <ProductSidebar />
      </div>

      {/* //? Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative flex h-full max-w-xs w-full">
            <div className="bg-white w-full h-full overflow-y-auto">
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <ProductSidebar />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content area */}
      <main className="flex-1 p-4 lg:p-6">
        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium"
        >
          <FiFilter className="h-4 w-4" />
          Filters
        </button>

        {children}
      </main>
    </div>
  );
};

export default Layout;
