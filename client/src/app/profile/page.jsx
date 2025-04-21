"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUser, FiShoppingBag, FiClock, FiTruck, FiCheckCircle, FiXCircle, FiPackage } from 'react-icons/fi';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useUserAuth } from '../hooks/useUserAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { orderUrl } from '../helper/BackendUrl';

const OrderStats = ({ orders }) => {
  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.orderStatus === 'delivered').length,
    processing: orders.filter(o => o.orderStatus === 'processing').length,
    cancelled: orders.filter(o => o.orderStatus === 'cancelled').length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Total Orders</p>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Delivered</p>
        <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Processing</p>
        <p className="text-2xl font-bold text-yellow-600">{stats.processing}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Cancelled</p>
        <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  useUserAuth();
  const user = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`${orderUrl}/user-orders`, {
          withCredentials: true
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <FiClock className="text-yellow-500" />;
      case 'shipped':
        return <FiTruck className="text-blue-500" />;
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to cancel this order?");
      if (!confirmed) return;

      const response = await axios.put(
        `http://localhost:9022/api/orders/${orderId}/cancel`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Order cancelled successfully");
        setOrders(orders.map(order => 
          order._id === orderId 
            ? { ...order, orderStatus: 'cancelled' } 
            : order
        ));
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg">Please login to view your profile</p>
          <Link href="/login" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* User Profile Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:px-10 sm:flex sm:items-center">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                <FiUser className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <FiPackage className="mr-1" />
                <span>{orders.length} {orders.length === 1 ? 'order' : 'orders'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Statistics */}
        {orders.length > 0 && <OrderStats orders={orders} />}

        {/* Order History Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <FiShoppingBag className="mr-2" />
              Order History
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {orders.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">You haven't placed any orders yet.</p>
                <Link href="/products" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Browse Products
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order._id.toString().slice(-8).toUpperCase()}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.orderStatus)}
                      <span className="ml-2 capitalize">{order.orderStatus}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    {order.items.map((item) => (
                      <div key={item.product} className="flex py-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image || '/placeholder-product.jpg'}
                            alt={item.productName}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                              {item.productName}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500">SAR {item.price.toFixed(2)}</p>
                            <p className="font-medium">SAR {(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-medium">Total: SAR {order.totalAmount.toFixed(2)}</p>
                      {order.orderStatus === 'processing' && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;