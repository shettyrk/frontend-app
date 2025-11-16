import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Mock discount codes — later fetched from backend
  const availableDiscounts = [
    { code: "WELCOME10", percentage: 10 },
    { code: "FESTIVE25", percentage: 25 },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount =
    discountApplied && discountApplied.percentage
      ? (subtotal * discountApplied.percentage) / 100
      : 0;

  const total = subtotal - discount;

  const handleApplyDiscount = () => {
    const found = availableDiscounts.find(
      (d) => d.code.toLowerCase() === discountCode.toLowerCase()
    );
    if (found) {
      setDiscountApplied(found);
      toast.success(`Discount code applied: ${found.percentage}% off 🎉`);
    } else {
      toast.error("Invalid or expired discount code ❌");
    }
  };

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      toast.error("Please enter your address before placing order");
      return;
    }

    setIsPlacingOrder(true);
    setTimeout(() => {
      clearCart();
      setIsPlacingOrder(false);
      toast.success("✅ Order placed successfully!");
      setDiscountApplied(null);
      setDiscountCode("");
      setAddress("");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-10 text-gray-600">
        🛒 Your cart is empty. <br />
        <a href="/shop" className="text-amber-600 font-semibold hover:underline">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 mt-6">
      <h1 className="text-2xl font-bold text-amber-700 mb-6">Checkout</h1>

      {/* Cart Summary */}
      <div className="space-y-4 border-b pb-6 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <p>
              {item.name} × {item.quantity}
            </p>
            <p className="font-medium text-amber-700">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}

        <div className="flex justify-between border-t pt-3 font-semibold text-gray-700">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>

        {discountApplied && (
          <div className="flex justify-between text-green-600 font-semibold">
            <span>Discount ({discountApplied.code}):</span>
            <span>- ₹{discount}</span>
          </div>
        )}

        <div className="flex justify-between border-t pt-3 text-lg font-bold text-amber-700">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Discount Code */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="border px-3 py-2 rounded-md flex-1 focus:ring-2 focus:ring-amber-500 outline-none"
        />
        <button
          onClick={handleApplyDiscount}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          Apply
        </button>
      </div>

      {/* Address Form */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Shipping Address
        </h2>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full shipping address..."
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
          rows="4"
        ></textarea>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
        className={`w-full py-3 rounded-md text-white font-semibold transition ${
          isPlacingOrder
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </button>

      {/* Mock Payment Section */}
      <div className="text-sm text-gray-500 mt-4 text-center">
        💳 (Payment gateway integration coming soon)
      </div>
    </div>
  );
};

export default Checkout;
