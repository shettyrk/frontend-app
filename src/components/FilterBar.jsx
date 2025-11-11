import React from "react";

const FilterBar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  search,
  onSearchChange,
  sort,
  onSortChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex-1">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search candles, scents, SKU..."
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex gap-3 items-center">
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="popular">Sort: Popular</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
