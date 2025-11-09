import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../pages/context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Lavender Candle", price: 299, image: "/images/lavender.jpg", description: "Relaxing aroma of lavender to calm your senses." },
    { id: 2, name: "Vanilla Bliss", price: 349, image: "/images/vanilla.jpg", description: "Sweet and warm scent for cozy evenings." },
    { id: 3, name: "Rose Serenity", price: 399, image: "/images/rose.jpg", description: "Elegant rose fragrance to refresh your space." },
    { id: 4, name: "Ocean Breeze", price: 379, image: "/images/ocean.jpg", description: "Cool, refreshing ocean-inspired fragrance." },
  ];

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center mt-10 text-xl">Product not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6 bg-yellow-50">
      <img src={product.image} alt={product.name} className="w-80 h-80 object-cover rounded-lg shadow-md" />
      <div className="md:ml-10 mt-6 md:mt-0 text-center md:text-left">
        <h1 className="text-3xl font-bold text-brown-700">{product.name}</h1>
        <p className="mt-2 text-lg text-gray-700">{product.description}</p>
        <p className="mt-4 text-2xl font-semibold text-pink-600">₹{product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-5 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
