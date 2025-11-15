import React, { useState } from "react";
import ProductList from "./ProductList";
import OrderManagement from "./OrderManagement";
import UserManagement from "./UserManagement";
import { useAuth } from "../../context/AuthContext";
import DiscountManagement from "./DiscountManagement";
import CategoryManagement from "./CategoryManagement";
import AdminOverview from "./AdminOverview";



const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("products");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Please log in as an admin to access this panel.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-md flex flex-col justify-between">
        <div className="p-6">
          <h2 className="text-xl font-bold text-amber-700 mb-6">Admin Panel</h2>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "products"
                    ? "bg-amber-600 text-white"
                    : "hover:bg-amber-100 text-gray-700"
                }`}
              >
                🕯️ Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "orders"
                    ? "bg-amber-600 text-white"
                    : "hover:bg-amber-100 text-gray-700"
                }`}
              >
                📦 Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "users"
                    ? "bg-amber-600 text-white"
                    : "hover:bg-amber-100 text-gray-700"
                }`}
              >
                👥 Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("discounts")}
                className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "discounts"
                    ? "bg-amber-600 text-white"
                    : "hover:bg-amber-100 text-gray-700"
                  }`}
              >
                💸 Discounts
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("categories")}
                className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "categories"
                    ? "bg-amber-600 text-white"
                    : "hover:bg-amber-100 text-gray-700"
                  }`}
              >
                🏷️ Categories
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "overview"
                    ? "bg-amber-600 text-white"
                    : "hover:bg-amber-100 text-gray-700"
                  }`}
              >
                📊 Overview
              </button>
            </li>

          </ul>
        </div>

        <div className="p-6 border-t text-sm text-gray-500">
          CandleStore © {new Date().getFullYear()}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "products" && <ProductList />}
        {activeTab === "orders" && <OrderManagement />}
        {activeTab === "users" && <UserManagement />}
        {activeTab === "discounts" && <DiscountManagement />}
        {activeTab === "categories" && <CategoryManagement />}
        {activeTab === "overview" && <AdminOverview />}
      </div>
    </div>
  );
};

export default AdminDashboard;
