"use client"
import { FiSearch } from "react-icons/fi";

export const ProductFilters = ({ 
  searchInput, 
  filters, 
  handleSearchChange, 
  handleFilterChange, 
  clearFilters 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col gap-4">
        {/* Main Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="search"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search products by name, description..."
            className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filters Section */}
        <div className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Range */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Price Range</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min price"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max price"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div className="relative flex-1">
                  <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex items-end justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500 cursor-pointer transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};