"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import { LoginModal } from '../LoginModal';
import { ProductHeader } from '../ProductHeader';
import { ProductImages } from '../ProductImages';
import { SizeSelector } from '../SizeSelector';
import { QuantitySelector } from '../QuantitySelector';
import { ProductFeatures } from '../ProductFeatures';
import { ProductActions } from '../ProductActions';
import { LoadingSpinner } from '@/app/utils/LoadingSpinner';
import { ErrorDisplay } from '@/app/utils/ErrorDisplay';
import { NotFound } from '@/app/utils/NotFound';
import { productUrl } from '@/app/helper/BackendUrl';
// import { ProductImages } from '../ProductImages';
// import { ProductHeader } from '../ProductHeader';
// import { SizeSelector } from '../SizeSelector';
// import { QuantitySelector } from '../QuantitySelector';
// import { ProductFeatures } from '../ProductFeatures';
// import { ProductActions } from '../ProductActions';
// import { LoginModal } from '../LoginModal';
// import { LoadingSpinner } from '../LoadingSpinner';
// import { ErrorDisplay } from '../ErrorDisplay';
// import { NotFound } from '../NotFound';

const ProductDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${productUrl}/getproduct/${productId}`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
          const combinedProduct = {
            ...data.product,
            brand: "EVERYDAY HUMANS",
            originalPrice: (data.product.price * 1.25).toFixed(2),
            discount: "20%",
            rating: 5,
            reviews: 214,
            sizes: ["M", "L"],
            features: [
              "Safe & Non-toxic",
              "Dermatologist Created",
              "Biodegradable Ingredients",
              "Vegan & Cruelty-free"
            ],
            images: [
              data.product.image,
              data.product.image,
              data.product.image,
              data.product.image,
            ],
            shippingInfo: "Ships for free the week of February 14th. 😊"
          };
          setProduct(combinedProduct);
        } else {
          throw new Error(data.message || 'Product not found');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);



  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    handleAddToCart();
    router.push(`/buyproduct/${product._id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} router={router} />;
  if (!product) return <NotFound router={router} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <LoginModal 
        showLoginModal={showLoginModal} 
        setShowLoginModal={setShowLoginModal} 
      />

      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages images={product.images} name={product.name} />
        
        <div className="space-y-6">
          <ProductHeader 
            brand={product.brand}
            name={product.name}
            rating={product.rating}
            reviews={product.reviews}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
          />
          
          <p className="text-gray-600">{product.description}</p>
          
          <SizeSelector 
            sizes={product.sizes} 
            selectedSize={selectedSize} 
            setSelectedSize={setSelectedSize} 
          />
          
          <QuantitySelector 
            quantity={quantity}
            increaseQuantity={() => setQuantity(q => Math.min(q + 1, 10))}
            decreaseQuantity={() => setQuantity(q => Math.max(q - 1, 1))}
          />
          
          <div className="py-2 text-sm text-gray-600">
            {product.shippingInfo}
          </div>
          
          <ProductFeatures features={product.features} />
          
          <ProductActions 
            // handleAddToCart={handleAddToCart}
            productId={product._id}
            handleBuyNow={handleBuyNow}
            isLoggedIn={isLoggedIn}
            setShowLoginModal={setShowLoginModal}
          />
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Details</h3>
        <p className="mt-4 text-gray-600">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;