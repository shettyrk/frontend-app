import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav className="sticky top-0 z-50 bg-amber-100/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between transition-all duration-300">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-amber-800">
          <Link to="/">CandleStore</Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-amber-900 font-medium">
          <li><Link to="/" className="hover:text-amber-600">Home</Link></li>
          <li><Link to="/shop" className="hover:text-amber-600">Shop</Link></li>
          <li><Link to="/about" className="hover:text-amber-600">About</Link></li>
          <li><Link to="/contact" className="hover:text-amber-600">Contact</Link></li>

          <li>
            <Link
              to="/cart"
              className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
            >
              <ShoppingCart size={18} />
              Cart ({cartCount})
            </Link>
          </li>

          {/* Account Links */}
          {user ? (
            <>
              <li><Link to="/dashboard" className="hover:text-amber-600">My Account</Link></li>
              <li><Link to="/admin" className="hover:text-amber-600">Admin</Link></li>
            </>
          ) : (
            <li><Link to="/login" className="hover:text-amber-600">Login</Link></li>
          )}
        </ul>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-amber-800 focus:outline-none"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-200 shadow-inner">
          <ul className="flex flex-col gap-4 px-6 py-4 text-amber-900 font-medium">
            <li><Link to="/" onClick={() => setIsOpen(false)} className="hover:text-amber-600">Home</Link></li>
            <li><Link to="/shop" onClick={() => setIsOpen(false)} className="hover:text-amber-600">Shop</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-amber-600">About</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-amber-600">Contact</Link></li>

            <li>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
              >
                <ShoppingCart size={18} />
                Cart ({cartCount})
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-amber-600">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="hover:text-amber-600">
                    Admin
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-amber-600">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
