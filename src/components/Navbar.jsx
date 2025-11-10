import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-amber-100 shadow">
      <h1 className="text-2xl font-bold text-amber-800">CandleStore</h1>
      <ul className="flex gap-6 text-amber-900 items-center">
        <li><Link to="/" className="hover:text-amber-600">Home</Link></li>
        <li><Link to="/shop" className="hover:text-amber-600">Shop</Link></li>
        <li><Link to="/about" className="hover:text-amber-600">About</Link></li>
        <li><Link to="/contact" className="hover:text-amber-600">Contact</Link></li>
        <li><Link to="/cart" className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
          Cart ({cartItems.length})
        </Link>
        </li>
        <li>{user ? (
          <Link to="/profile" className="hover:text-amber-400">
            Profile
          </Link>
        ) : (
          <Link to="/login" className="hover:text-amber-400">
            Login
          </Link>
        )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
