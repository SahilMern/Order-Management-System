"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiCheck, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "@/app/context/SocketContext";
import { orderUrl } from "@/app/helper/BackendUrl";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [status, setStatus] = useState("");

  const statusOptions = ["processing", "shipped", "delivered", "cancelled"];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${orderUrl}/allorderdetails`, {
        withCredentials: true,
      });
      setOrders(data.orders);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Socket.io event listeners
    socket.on("new-order", (newOrder) => {
      setOrders((prev) => [newOrder, ...prev]);
      toast.success(
        `New Order #${newOrder._id
          .toString()
          .slice(-8)
          .toUpperCase()} received!`
      );
    });

    socket.on("order-status-changed", (updatedOrder) => {
      console.log(updatedOrder);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id
            ? { ...order, orderStatus: updatedOrder.orderStatus }
            : order
        )
      );
      toast.success(
        `Order #${updatedOrder._id
          .toString()
          .slice(-8)
          .toUpperCase()} updated to ${updatedOrder.orderStatus}`
      );
    });

    return () => {
      socket.off("new-order");
      socket.off("order-status-changed");
    };
  }, []);

  const handleEditClick = (order) => {
    setEditingOrderId(order._id);
    setStatus(order.orderStatus);
  };

  const handleStatusUpdate = async (orderId) => {
    try {
      await axios.put(
        `${orderUrl}/${orderId}/status`,
        { status },
        { withCredentials: true }
      );
      toast.success("Order status update request sent");
      setEditingOrderId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";

    switch (status) {
      case "processing":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            Processing
          </span>
        );
      case "shipped":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            Shipped
          </span>
        );
      case "delivered":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            Cancelled
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{order._id.toString().slice(-8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customerName}
                    <br />
                    <span className="text-xs text-gray-400">{order.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    SAR {order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingOrderId === order._id ? (
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      getStatusBadge(order.orderStatus)
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingOrderId === order._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(order._id)}
                          className="text-green-600 hover:text-green-900"
                          title="Save"
                        >
                          <FiCheck size={18} />
                        </button>
                        <button
                          onClick={() => setEditingOrderId(null)}
                          className="text-red-600 hover:text-red-900"
                          title="Cancel"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditClick(order)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit Status"
                      >
                        <FiEdit size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagementPage;
