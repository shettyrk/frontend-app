import React, { useState } from "react";
import { Truck, Package, Clock, CheckCircle } from "lucide-react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "John Doe",
      total: 799,
      status: "Pending",
      date: "2025-11-01",
      items: ["Vanilla Candle", "Decorative Candle"],
    },
    {
      id: "ORD-1002",
      customer: "Sarah Smith",
      total: 1299,
      status: "Processing",
      date: "2025-11-03",
      items: ["Rose Candle"],
    },
    {
      id: "ORD-1003",
      customer: "Michael Brown",
      total: 499,
      status: "Shipped",
      date: "2025-11-05",
      items: ["Lavender Candle"],
    },
    {
      id: "ORD-1004",
      customer: "Emma Wilson",
      total: 999,
      status: "Delivered",
      date: "2025-11-06",
      items: ["Cinnamon Candle", "Vanilla Candle"],
    },
  ]);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDelete = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  // Dashboard Summary
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const shippedOrders = orders.filter((o) => o.status === "Shipped").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-amber-700">Order Management</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border-l-4 border-yellow-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <Clock className="text-yellow-500" size={32} />
          <div>
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-xl font-bold text-gray-800">{pendingOrders}</p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <Package className="text-blue-500" size={32} />
          <div>
            <p className="text-gray-600 text-sm">Processing</p>
            <p className="text-xl font-bold text-gray-800">
              {orders.filter((o) => o.status === "Processing").length}
            </p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-purple-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <Truck className="text-purple-500" size={32} />
          <div>
            <p className="text-gray-600 text-sm">Shipped</p>
            <p className="text-xl font-bold text-gray-800">{shippedOrders}</p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-green-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <CheckCircle className="text-green-500" size={32} />
          <div>
            <p className="text-gray-600 text-sm">Delivered</p>
            <p className="text-xl font-bold text-gray-800">{deliveredOrders}</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-amber-50 text-gray-800">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Total (₹)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-amber-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-800">
                  {order.id}
                </td>
                <td className="px-6 py-3">{order.customer}</td>
                <td className="px-6 py-3">
                  {order.items.join(", ")}
                </td>
                <td className="px-6 py-3 font-semibold text-amber-700">
                  ₹{order.total}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3">{order.date}</td>
                <td className="px-6 py-3 flex gap-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No orders available.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
