import React from "react";
import { useLocation, Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const { name } = location.state || {};

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-lg mb-4">
        Thank you {name || "dear customer"} for your order! Your candles will arrive soon 🕯️
      </p>
      <Link
        to="/"
        className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Success;
