"use client";
import socket from "@/app/context/SocketContext";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DashboardHome = () => {
  useEffect(() => {
    // Socket.io event listeners
    socket.on("new-order", (newOrder) => {
      toast.success(
        `New Order #${newOrder._id.toString().slice(-8).toUpperCase()}`,
        {
          position: "top-right",
        }
      );
    });

    socket.on("order-status-changed", (updatedOrder) => {
      toast.success("new cahnges")
    });

    return () => {
      socket.off("new-order");
      socket.off("order-status-changed");
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview (DUMMY DATA😋)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-3xl font-bold text-gray-800">1,234</h3>
          <p className="text-gray-600">Total Users</p>
          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            +12%
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-3xl font-bold text-gray-800">567</h3>
          <p className="text-gray-600">Total Orders</p>
          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            +5%
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-3xl font-bold text-gray-800">$12,345</h3>
          <p className="text-gray-600">Total Revenue</p>
          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            +8%
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <p className="text-gray-600">Your recent activities will appear here</p>
      </div>
    </div>
  );
};

export default DashboardHome;
