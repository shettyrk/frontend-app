import React, { useState } from "react";
import { Tag, Calendar, Percent, Trash2, Edit } from "lucide-react";

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      code: "WELCOME10",
      description: "10% off for new customers",
      percentage: 10,
      expiry: "2025-12-31",
      active: true,
    },
    {
      id: 2,
      code: "FESTIVE25",
      description: "25% off on all festive candles",
      percentage: 25,
      expiry: "2025-11-30",
      active: true,
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    code: "",
    description: "",
    percentage: "",
    expiry: "",
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
      // Edit
      setDiscounts((prev) =>
        prev.map((d) => (d.id === formData.id ? formData : d))
      );
    } else {
      // Add new
      setDiscounts((prev) => [
        ...prev,
        { ...formData, id: Date.now(), percentage: parseFloat(formData.percentage) },
      ]);
    }

    setFormData({
      id: null,
      code: "",
      description: "",
      percentage: "",
      expiry: "",
      active: true,
    });
    setShowForm(false);
  };

  const handleEdit = (discount) => {
    setFormData(discount);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleToggleActive = (id) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d))
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-amber-700">Discount & Promo Codes</h1>

      {/* Add / Edit Form */}
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-sm border border-amber-100 space-y-4"
        >
          <h2 className="text-xl font-semibold text-amber-700">
            {formData.id ? "Edit Promo Code" : "Add New Promo Code"}
          </h2>

          <input
            type="text"
            name="code"
            placeholder="Code (e.g. SUMMER20)"
            value={formData.code}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500"
          ></textarea>

          <input
            type="number"
            name="percentage"
            placeholder="Discount Percentage (%)"
            value={formData.percentage}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500"
            required
          />

          <input
            type="date"
            name="expiry"
            placeholder="Expiry Date"
            value={formData.expiry}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500"
            required
          />

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
          + Add Promo Code
        </button>
      )}

      {/* Discounts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-amber-50 text-gray-800">
            <tr>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Discount (%)</th>
              <th className="px-6 py-3">Expiry</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr
                key={discount.id}
                className="border-t hover:bg-amber-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-800 flex items-center gap-2">
                  <Tag className="text-amber-600" size={16} /> {discount.code}
                </td>
                <td className="px-6 py-3">{discount.description}</td>
                <td className="px-6 py-3 font-semibold text-amber-700">
                  {discount.percentage}%
                </td>
                <td className="px-6 py-3 flex items-center gap-2">
                  <Calendar size={16} /> {discount.expiry}
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleToggleActive(discount.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      discount.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {discount.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(discount)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-1"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(discount.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {discounts.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No discount codes available.
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountManagement;
