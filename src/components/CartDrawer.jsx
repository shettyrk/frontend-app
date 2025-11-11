import React from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Overlay background */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer panel */}
      <div
        className={`absolute top-0 right-0 h-full bg-white shadow-xl w-80 sm:w-96 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 overflow-y-auto h-[70vh]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 mt-10 text-center">Your cart is empty 🛒</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  className="text-red-500 text-sm hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          {cartItems.length > 0 && (
            <>
              <div className="flex justify-between mb-4 text-lg font-semibold">
                <span>Total:</span>
                <span className="text-amber-700">₹{total}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded-lg"
                >
                  View Cart
                </Link>
                <button
                  onClick={clearCart}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
