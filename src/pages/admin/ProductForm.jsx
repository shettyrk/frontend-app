import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, existingProduct, onCancel }) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (existingProduct) setProduct(existingProduct);
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({ id: "", name: "", price: "", category: "", description: "", image: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-amber-200"
    >
      <h2 className="text-xl font-bold text-amber-700 mb-4">
        {existingProduct ? "Edit Product" : "Add New Product"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        value={product.price}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
      ></textarea>
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />

      <div className="flex gap-3 justify-end mt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          {existingProduct ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
