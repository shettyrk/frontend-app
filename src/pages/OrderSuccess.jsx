import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with CandleStore. Your candles will be shipped soon!
        </p>
        <div className="flex gap-4">
          <Link
            to="/shop"
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
