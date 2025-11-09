import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";

function Home() {
  const { addToCart, cartItems } = useContext(CartContext);

  const products = [
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product B", price: 200 },
    { id: 3, name: "Product C", price: 300 },
  ];

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🛍️ Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-600 mb-2">₹{p.price}</p>
            <button
              disabled={isInCart(p.id)}
              className={`px-3 py-1 rounded text-white ${
                isInCart(p.id)
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => addToCart(p)}
            >
              {isInCart(p.id) ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-6 font-semibold">
        Items in cart: {cartItems.length}
      </p>
    </div>
  );
}

export default Home;
