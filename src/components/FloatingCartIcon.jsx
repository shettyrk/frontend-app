import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const FloatingCartIcon = () => {
  const { cartItems } = useCart();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition duration-300"
      >
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs font-bold rounded-full px-2 py-0.5">
            {itemCount}
          </span>
        )}
      </button>

      {/* Drawer */}
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default FloatingCartIcon;
