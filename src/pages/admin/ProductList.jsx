import React, { useState } from "react";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Vanilla Scented Candle",
      price: 299,
      category: "Scented",
      description: "Smooth vanilla aroma perfect for calm evenings.",
      image: "https://images.unsplash.com/photo-1606813902775-7639b91f6a5c?w=400",
    },
    {
      id: 2,
      name: "Decorative Floral Candle",
      price: 399,
      category: "Decorative",
      description: "Beautiful flower-shaped wax candle for gifts.",
      image: "https://images.unsplash.com/photo-1623250820557-c638a74a8b7d?w=400",
    },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (product) => {
    if (product.id) {
      // Editing
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      // Adding
      const newProduct = { ...product, id: Date.now() };
      setProducts((prev) => [...prev, newProduct]);
    }
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-700">Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          + Add Product
        </button>
      </div>

      {showForm ? (
        <ProductForm
          onSubmit={handleAdd}
          existingProduct={editingProduct}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-amber-100 shadow-sm rounded-lg p-4 flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg mb-3 w-full h-40 object-cover"
              />
              <h3 className="text-lg font-semibold text-amber-800">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="font-bold text-amber-700 mt-2">₹{product.price}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
