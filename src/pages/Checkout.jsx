import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: Date.now(),
      user: user?.email,
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      ),
      shipping: formData,
      status: "Processing",
      createdAt: new Date().toISOString(),
    };

    // ✅ Save locally for now
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

    clearCart();
    navigate("/order-success");
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/shop")}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg">
        {/* LEFT - Checkout Form */}
        <div>
          <h2 className="text-2xl font-bold text-amber-700 mb-4">Checkout</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT - Order Summary */}
        <div>
          <h2 className="text-2xl font-bold text-amber-700 mb-4">
            Order Summary
          </h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-lg font-semibold">
            <span>Total:</span>
            <span className="text-amber-700">₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
