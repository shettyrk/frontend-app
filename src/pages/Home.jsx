import React from "react";
import { useCart } from "../context/CartContext";

const Home = () => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const products = [
    { id: 1, name: "Lavender Bliss Candle", price: 299, image: "/images/lavender.jpg" },
    { id: 2, name: "Vanilla Comfort Candle", price: 349, image: "/images/vanilla.jpg" },
    { id: 3, name: "Rose Serenity Candle", price: 399, image: "/images/rose.jpg" },
    { id: 4, name: "Ocean Breeze Candle", price: 379, image: "/images/ocean.jpg" },
  ];

  const getQuantity = (id) => {
    const item = cartItems.find((p) => p.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">
        🕯️ Our Featured Candles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const quantity = getQuantity(product.id);

          return (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-md"
              />
              <h2 className="mt-3 text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600">₹{product.price}</p>

              {quantity > 0 ? (
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    –
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
