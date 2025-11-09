import React, { useState } from "react";
import { useCart } from "../pages/context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    // for now, just clear the cart and navigate to success page
    navigate("/success", { state: { ...formData } });
  };

  const total = (cartItems || []).reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-brown-700 mb-8">Checkout</h1>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-brown-700 mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <p>{item.name}</p>
              <p className="font-medium text-pink-600">₹{item.price}</p>
            </div>
          ))}
          <div className="text-right mt-4 text-lg font-semibold">
            Total: ₹{total}
          </div>
        </div>

        <form onSubmit={handleOrder} className="space-y-4">
          <h2 className="text-xl font-semibold text-brown-700">Shipping Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full border rounded-lg px-4 py-2"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            required
            className="w-full border rounded-lg px-4 py-2"
            value={formData.address}
            onChange={handleChange}
          ></textarea>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full border rounded-lg px-4 py-2"
            value={formData.phone}
            onChange={handleChange}
          />

          <div>
            <label className="font-semibold">Payment Method: </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="Card">Credit/Debit Card</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
