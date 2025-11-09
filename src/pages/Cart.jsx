import React from "react";
import { useCart } from "./context/CartContext";

const Cart = () => {
const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

const totalPrice = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
            {cartItems.map((item) => (
  <div
    key={item.id}
    className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg"
  >
    <div>
      <h2 className="text-lg font-semibold">{item.name}</h2>
      <p className="text-gray-500">
        ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
      </p>
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={() => decreaseQuantity(item.id)}
        className="px-2 py-1 bg-gray-300 rounded"
      >
        –
      </button>
      <span>{item.quantity}</span>
      <button
        onClick={() => increaseQuantity(item.id)}
        className="px-2 py-1 bg-gray-300 rounded"
      >
        +
      </button>
      <button
        onClick={() => removeFromCart(item.id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  </div>
))}

         

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
            <div>
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 mr-3"
              >
                Clear Cart
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
