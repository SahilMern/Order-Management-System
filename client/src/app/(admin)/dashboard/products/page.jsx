"use client"
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { productUrl } from "@/app/helper/BackendUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductFilters } from "./ProductFilters";
import { ProductTable } from "./ProductTable";
import { Pagination } from "./Pagination";

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    minPrice: "",
    maxPrice: "",
    startDate: "",
    endDate: ""
  });

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const initialSearch = query.get('search') || "";
    setFilters({
      page: parseInt(query.get('page')) || 1,
      limit: parseInt(query.get('limit')) || 10,
      search: initialSearch,
      minPrice: query.get('minPrice') || "",
      maxPrice: query.get('maxPrice') || "",
      startDate: query.get('startDate') || "",
      endDate: query.get('endDate') || ""
    });
    setSearchInput(initialSearch);
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedUpdateFilters = useCallback(
    debounce((searchValue) => {
      setFilters(prev => ({
        ...prev,
        search: searchValue,
        page: 1
      }));
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedUpdateFilters(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const queryParams = {};
        for (const key in filters) {
          if (filters[key]) {
            queryParams[key] = filters[key];
          }
        }

        const newUrl = `${window.location.pathname}?${new URLSearchParams(queryParams).toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        const response = await axios.get(`${productUrl}/getproducts`, {
          params: queryParams,
          withCredentials: true
        });

        setProducts(response.data.products);
        setTotalProducts(response.data.pagination.totalProducts);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
    }
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      search: "",
      minPrice: "",
      maxPrice: "",
      startDate: "",
      endDate: ""
    });
    setSearchInput("");
  };

  const handleEdit = (productId) => {
    router.push(`/dashboard/productedit/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      await axios.delete(`${productUrl}/${productId}`, {
        withCredentials: true
      });
      
      toast.success("Product deleted successfully");
      setFilters(prev => ({ ...prev }));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  const totalPages = Math.ceil(totalProducts / filters.limit);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Products Management</h2>
      
      <ProductFilters 
        searchInput={searchInput}
        filters={filters}
        handleSearchChange={handleSearchChange}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ProductTable 
          products={products}
          loading={loading}
          error={error}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isDeleting={isDeleting}
        />
        
        {!loading && !error && products.length > 0 && (
          <Pagination 
            page={filters.page}
            limit={filters.limit}
            totalProducts={totalProducts}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Products;