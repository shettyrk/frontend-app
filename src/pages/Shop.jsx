import React, { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

/* SAMPLE product list (expand later or load from API) */
const PRODUCTS = [
  {
    id: 1,
    name: "Lavender Bliss Candle",
    price: 499,
    category: "Scented",
    scent: "Lavender",
    weight: "200g",
    image: "https://via.placeholder.com/400x300?text=Lavender",
    createdAt: "2025-10-01",
    popularity: 90,
  },
  {
    id: 2,
    name: "Vanilla Dream Candle",
    price: 399,
    category: "Scented",
    scent: "Vanilla",
    weight: "180g",
    image: "https://via.placeholder.com/400x300?text=Vanilla",
    createdAt: "2025-09-10",
    popularity: 75,
  },
  {
    id: 3,
    name: "Citrus Sunrise Candle",
    price: 449,
    category: "Seasonal",
    scent: "Citrus",
    weight: "220g",
    image: "https://via.placeholder.com/400x300?text=Citrus",
    createdAt: "2025-11-01",
    popularity: 60,
  },
  {
    id: 4,
    name: "Decorative Glass Candle",
    price: 699,
    category: "Decorative",
    scent: "None",
    weight: "300g",
    image: "https://via.placeholder.com/400x300?text=Decorative",
    createdAt: "2025-08-20",
    popularity: 50,
  },
  // <-- add more items as needed
];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("popular");

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.category));
    return Array.from(set);
  }, []);

  // compute filteredProducts using memo so it's performant
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.slice();

    // category filter
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // search filter (name, scent, maybe SKU)
    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.scent && p.scent.toLowerCase().includes(q)) ||
          (p.id && String(p.id) === q)
      );
    }

    // sorting
    if (sort === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      // popular
      list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return list;
  }, [search, selectedCategory, sort]);

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">Shop Candles</h1>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">No products match your search.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
