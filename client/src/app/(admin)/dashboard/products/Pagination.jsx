"use client"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Pagination = ({ 
  page, 
  limit, 
  totalProducts, 
  totalPages, 
  handlePageChange 
}) => {
  return (
    <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
      <div className="mb-4 sm:mb-0 text-sm text-gray-700">
        Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
        <span className="font-medium">
          {Math.min(page * limit, totalProducts)}
        </span>{' '}
        of <span className="font-medium">{totalProducts}</span> products
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`p-2 rounded-md ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-md text-sm ${page === pageNum ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className={`p-2 rounded-md ${page >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};