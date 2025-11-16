import React, { useState } from "react";
import { Tag, Edit, Trash2, Eye, EyeOff } from "lucide-react";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Scented", description: "Aromatic candles for home ambience", active: true },
    { id: 2, name: "Decorative", description: "Beautiful candles for decor and gifts", active: true },
    { id: 3, name: "Seasonal", description: "Festive and themed candles", active: false },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    active: true,
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      // Edit existing
      setCategories((prev) =>
        prev.map((c) => (c.id === formData.id ? formData : c))
      );
    } else {
      // Add new
      setCategories((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }

    setFormData({ id: null, name: "", description: "", active: true });
    setShowForm(false);
  };

  const handleEdit = (category) => {
    setFormData(category);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleActive = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, active: !c.active } : c
      )
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-amber-700">Category Management</h1>

      {/* Add / Edit Form */}
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-sm border border-amber-100 space-y-4"
        >
          <h2 className="text-xl font-semibold text-amber-700">
            {formData.id ? "Edit Category" : "Add New Category"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500"
            required
          />

          <textarea
            name="description"
            placeholder="Category Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500"
          ></textarea>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            <span className="text-sm text-gray-700">Active</span>
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              {formData.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          + Add Category
        </button>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-amber-50 text-gray-800">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-t hover:bg-amber-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-800 flex items-center gap-2">
                  <Tag className="text-amber-600" size={16} /> {category.name}
                </td>
                <td className="px-6 py-3">{category.description}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleToggleActive(category.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      category.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {category.active ? "Active" : "Hidden"}
                  </button>
                </td>
                <td className="px-6 py-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-1"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No categories available.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
