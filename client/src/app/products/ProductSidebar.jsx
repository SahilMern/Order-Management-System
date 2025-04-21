"use client";
import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

const ProductSidebar = () => {
  const [isClient, setIsClient] = useState(false);
  const [openSections, setOpenSections] = useState({
    category: true, // Default open
    price: true, // Default open
    stock: true, // Default open
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [inStockOnly, setInStockOnly] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);

    // Initialize filters from URL params
    const params = new URLSearchParams(searchParams.toString());
    const categories = params.get("category")
      ? params.get("category").split(",")
      : [];
    const minPrice = params.get("minPrice");
    const maxPrice = params.get("maxPrice");
    const stock = params.get("inStock");

    if (categories.length > 0) setSelectedCategories(categories);
    if (minPrice)
      setPriceRange((prev) => ({ ...prev, min: parseInt(minPrice) }));
    if (maxPrice)
      setPriceRange((prev) => ({ ...prev, max: parseInt(maxPrice) }));
    if (stock === "true") setInStockOnly(true);
  }, [searchParams]);

  // const categories = [
  //   { id: "Shirt", name: "Shirt", count: 120 },
  //   { id: "fashion", name: "Fashion", count: 85 },
  //   { id: "Jeans", name: "Home & Kitchen", count: 64 },
  //   { id: "beauty", name: "Beauty", count: 42 },
  // ];
  // const categories = [
  //   "Shirt",
  //   "Jeans",
  //   "T-Shirt",
  //   "Shoes",
  //   "Dress",
  //   "Jacket",
  //   "Accessories",
  //   "Electronics",
  //   "Home Appliances",
  //   "Other"
  // ];

  const categories = [
    { id: 'Shirt', name: 'Shirt', count: 120 },
    { id: 'Jeans', name: 'Home & Kitchen', count: 64 },
    { id: 'T-Shirt', name: 'T-Shirt', count: 0 },
    { id: 'Shoes', name: 'Shoes', count: 0 },
    { id: 'Jacket', name: 'Jacket', count: 0 },
  ]
  
  const updateUrlParams = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    }

    if (priceRange.min > 0 || priceRange.max < 1000) {
      params.set("minPrice", priceRange.min.toString());
      params.set("maxPrice", priceRange.max.toString());
    }

    if (inStockOnly) {
      params.set("inStock", "true");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    setPriceRange((prev) => ({
      ...prev,
      [type]: isNaN(value) ? (type === "min" ? 0 : 1000) : value,
    }));
  };

  const handleStockChange = (e) => {
    setInStockOnly(e.target.checked);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 1000 });
    setInStockOnly(false);
    router.push("?", { scroll: false });
  };

  useEffect(() => {
    if (isClient) {
      updateUrlParams();
    }
  }, [selectedCategories, priceRange, inStockOnly]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Categories Filter - Always open by default */}
      <div className="border-b border-gray-200 pb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <h3 className="font-medium text-gray-900">Categories</h3>
          {openSections.category ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        <div
          className={`mt-3 space-y-2 ${!openSections.category ? "hidden" : ""}`}
        >
          {categories.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                id={`category-${item.id}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={selectedCategories.includes(item.id)}
                onChange={() => handleCategoryChange(item.id)}
              />
              <label
                htmlFor={`category-${item.id}`}
                className="ml-3 text-sm text-gray-600"
              >
                {item.name}{" "}
                <span className="text-gray-400">({item.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter - Always open by default */}
      <div className="border-b border-gray-200 pb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="font-medium text-gray-900">Price Range</h3>
          {openSections.price ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        <div className={`mt-3 ${!openSections.price ? "hidden" : ""}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">$0</span>
            <span className="text-sm">$1000</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                max: parseInt(e.target.value),
              }))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-4 gap-2">
            <input
              type="number"
              min="0"
              max="1000"
              value={priceRange.min}
              onChange={(e) => handlePriceChange(e, "min")}
              className="w-full p-2 border rounded-md text-sm"
            />
            <span className="self-center text-gray-400">to</span>
            <input
              type="number"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={(e) => handlePriceChange(e, "max")}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      {/* In Stock Filter - Always open by default */}
      <div className="border-b border-gray-200 pb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("stock")}
        >
          <h3 className="font-medium text-gray-900">Availability</h3>
          {openSections.stock ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        <div
          className={`mt-3 flex items-center ${
            !openSections.stock ? "hidden" : ""
          }`}
        >
          <input
            id="in-stock"
            type="checkbox"
            checked={inStockOnly}
            onChange={handleStockChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="in-stock" className="ml-3 text-sm text-gray-600">
            In Stock Only
          </label>
        </div>
      </div>

      {/* Clear All Button */}
      <button
        className="w-full py-2 px-4 bg-black border rounded-md text-sm font-medium text-white hover:bg-red-500  transition-colors duration-200 shadow-sm focus:outline-none cursor-pointer"
        onClick={clearAllFilters}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductSidebar;
