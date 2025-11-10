import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Slider from "react-slick";

const PRODUCTS = [
  {
    id: 1,
    name: "Lavender Bliss Candle",
    price: 499,
    category: "Scented",
    scent: "Lavender",
    weight: "250g",
    sku: "CS-001",
    stock: 12,
    tags: ["eco-friendly", "soy wax"],
    description:
      "A soothing lavender aroma perfect for relaxation and bedtime calmness. Hand-poured using soy wax and essential oils.",
    image: "https://via.placeholder.com/500x400?text=Lavender+Candle",
  },
  {
    id: 2,
    name: "Vanilla Dream Candle",
    price: 399,
    category: "Scented",
    scent: "Vanilla",
    weight: "200g",
    sku: "CS-002",
    stock: 0,
    tags: ["handmade", "aromatherapy"],
    description:
      "A warm vanilla fragrance that fills your room with sweetness and nostalgia.",
    image: "https://via.placeholder.com/500x400?text=Vanilla+Candle",
  },
  {
    id: 3,
    name: "Decorative Glass Candle",
    price: 699,
    category: "Decorative",
    scent: "Unscented",
    weight: "300g",
    sku: "CS-003",
    stock: 8,
    tags: ["decor piece", "premium glass"],
    description:
      "Beautifully crafted candle in a decorative glass holder — a perfect gift for special occasions.",
    image: "https://via.placeholder.com/500x400?text=Decorative+Candle",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === Number(id));
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  );

  if (!product) return <div className="p-6 text-center">Product not found.</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg shadow-lg w-full h-auto"
        />

        <div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Price:</strong>{" "}
              <span className="text-amber-700 font-semibold">
                ₹{product.price}
              </span>
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Scent:</strong> {product.scent}
            </p>
            <p>
              <strong>Weight:</strong> {product.weight}
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </p>

            {product.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-200 text-amber-800 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className={`mt-6 px-5 py-2 rounded-lg text-white font-semibold ${
              product.stock > 0
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {product.stock > 0 ? "Add to Cart 🛒" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">
            You may also like
          </h2>
          <Slider {...sliderSettings}>
            {relatedProducts.map((rp) => (
              <div key={rp.id} className="p-3">
                <div className="bg-white shadow-md rounded-lg p-4">
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="rounded-lg mb-3 w-full h-48 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {rp.name}
                  </h3>
                  <p className="text-amber-600 font-medium mb-2">
                    ₹{rp.price}
                  </p>
                  <button
                    onClick={() => addToCart(rp)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
