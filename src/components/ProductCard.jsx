import React from "react";
import { Link } from "react-router-dom"; // 🆕 Add this line
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {/* 🆕 Wrap the image + text part inside a Link */}
      {product && (
        <Link
          to={`/product/${product.id}`}
          className="block hover:scale-105 transition"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover rounded-lg"
          />
          <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          <p className="text-gray-500">₹{product.price}</p>
        </Link>
      )}

      {/* Keep Add to Cart button outside the link */}
      {product && (
  <button
    onClick={() => addToCart(product)}
    className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
  >
    Add to Cart
  </button>
)}

    </div>
  );
};

export default ProductCard;
