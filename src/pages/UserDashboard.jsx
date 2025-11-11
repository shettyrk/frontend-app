import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import OrderHistory from "./OrderHistory";
import Profile from "./Profile";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Please log in to view your account.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-amber-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-amber-700 mb-6 text-center">
            My Account
          </h2>

          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
                  activeTab === "profile"
                    ? "bg-amber-600 text-white"
                    : "text-gray-700 hover:bg-amber-100"
                }`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
                  activeTab === "orders"
                    ? "bg-amber-600 text-white"
                    : "text-gray-700 hover:bg-amber-100"
                }`}
              >
                My Orders
              </button>
            </li>
          </ul>
        </div>

        <button
          onClick={logout}
          className="mt-8 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "profile" && <Profile />}
        {activeTab === "orders" && <OrderHistory />}
      </div>
    </div>
  );
};

export default UserDashboard;
