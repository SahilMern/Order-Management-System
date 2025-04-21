"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { ProductCard } from "./ProductCard";
import Pagination from "./paggination";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { productUrl } from "../helper/BackendUrl";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedSearch, setDisplayedSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalProducts: 0,
    totalPages: 1,
  });
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setDisplayedSearch(value);
    debouncedSearch(value);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(searchParams.get("category") && {
          category: searchParams.get("category"),
        }),
        ...(searchParams.get("minPrice") && {
          minPrice: searchParams.get("minPrice"),
        }),
        ...(searchParams.get("maxPrice") && {
          maxPrice: searchParams.get("maxPrice"),
        }),
        ...(searchQuery && { search: searchQuery }),
      };

      const response = await axios.get(
        `${productUrl}/getall`,
        {
          params,
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setProducts(response.data.products);
        setPagination({
          page: response.data.pagination.page,
          limit: response.data.pagination.limit,
          totalProducts: response.data.pagination.totalProducts,
          totalPages: response.data.pagination.totalPages,
        });
      } else {
        throw new Error(response.data?.message || "Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams, searchQuery, pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 lg:py-8">
      {/* Search */}
      <form onSubmit={(e) => e.preventDefault()} className="mb-6 sm:mb-8 w-full max-w-md mx-auto sm:mx-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            value={displayedSearch}
            onChange={handleSearchChange}
          />
        </div>
      </form>

      {/* Results Header */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          {loading ? "Loading..." : `Products (${pagination.totalProducts})`}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm">Sort:</span>
          <select
            className="border rounded-md px-2 py-1 text-xs sm:text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            disabled={true}
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-md mb-4 sm:mb-6 text-sm sm:text-base">
          {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg aspect-square animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {!loading && products.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalProducts}
              itemsPerPage={pagination.limit}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <h3 className="text-lg sm:text-xl font-medium">No products found</h3>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;