import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-100 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* --- Brand Info --- */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-white">CandleStore</h2>
          <p className="text-amber-200">
            Handcrafted eco-friendly candles that bring warmth and aroma to your home.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-amber-400">Home</Link></li>
            <li><Link to="/shop" className="hover:text-amber-400">Shop</Link></li>
            <li><Link to="/about" className="hover:text-amber-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-amber-400">Contact</Link></li>
          </ul>
        </div>

        {/* --- Social Media --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex gap-5 text-2xl">
            <a href="#" className="hover:text-amber-400"><FaFacebook /></a>
            <a href="#" className="hover:text-amber-400"><FaInstagram /></a>
            <a href="#" className="hover:text-amber-400"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-amber-300 mt-8 text-sm border-t border-amber-700 pt-4">
        © {new Date().getFullYear()} CandleStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
