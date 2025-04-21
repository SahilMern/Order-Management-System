"use client";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
      <div className="text-sm text-gray-600">
        Showing {startItem} - {endItem} of {totalItems} items
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          aria-label="Previous page"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        {getPageNumbers().map((pageNum, index) =>
          pageNum === "..." ? (
            <span key={index} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(pageNum)}
              className={`w-10 h-10 rounded-md flex items-center justify-center ${
                currentPage === pageNum
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
              aria-current={currentPage === pageNum ? "page" : undefined}
              aria-label={`Page ${pageNum}`}
            >
              {pageNum}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`p-2 rounded-md ${
            currentPage >= totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          aria-label="Next page"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;