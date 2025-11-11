import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    if (user) {
      // Filter orders by logged-in user
      const userOrders = storedOrders.filter(
        (order) => order.user === user.email
      );
      setOrders(userOrders);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Please login to view your orders.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-amber-700 mb-6 text-center">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="mb-4">You haven't placed any orders yet.</p>
            <Link
              to="/shop"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">
                    Order #{order.id.toString().slice(-6)}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-3">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>

                <ul className="divide-y divide-gray-200 mb-4">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between py-2 text-gray-700"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-amber-700">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
