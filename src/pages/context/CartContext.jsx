import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // ✅ Load cart from localStorage on first load
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

const [totalPrice, setTotalPrice] = useState(0);

const showCartToast = (message, type) => {
  toast.dismiss("cartAction");
  toast[type](message, { id: "cartAction" });
};


 useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

 // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  let toastLock = false; // Prevent duplicate toasts (for Strict Mode)

const addToCart = (product) => {
  setCartItems((prev) => {
    const existingItem = prev.find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      if (!toastLock) {
        toastLock = true;
        showCartToast("Increased quantity in cart 🛒", "success");
        setTimeout(() => (toastLock = false), 200);
      }
    } else {
      updatedCart = [...prev, { ...product, quantity: 1 }];

      if (!toastLock) {
        toastLock = true;
        showCartToast("Added to cart 🛍️", "success");
        setTimeout(() => (toastLock = false), 200);
      }
    }

    return updatedCart;
  });
};


const removeFromCart = (id) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));
 showCartToast("Item removed ❌", "error");
};

const clearCart = () => {
  setCartItems([]);
  toast("Cart cleared 🧹");
};

  const increaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart , totalPrice , increaseQuantity, decreaseQuantity}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
