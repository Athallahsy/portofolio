import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ['about', 'skills', 'projects', 'contact'];

  return (
    <nav className="bg-white text-black shadow-xl sticky top-0 z-50 border-b border-gray-200 transition-all duration-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6 md:px-12 relative">
        {/* Floating GIF at bottom navbar */}
        <img
          src={`${process.env.PUBLIC_URL}/Happy Pixel Sticker.gif`}
          alt="Animated Logo"
          className="hidden md:block absolute -bottom-6 right-2 w-20"
        />

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-extrabold tracking-tight font-space relative group flex items-center space-x-1">
            <span className="text-blue-900 text-2xl">{'</>'}</span>
            <span className="text-black group-hover:text-blue-900 transition duration-300">Atha</span>
            <span className="text-blue-900 group-hover:text-black transition duration-300">Folio</span>
            <div className="absolute -inset-2 bg-blue-900/10 rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-10 font-medium text-base">
          {navItems.map((item) => (
            <li key={item} className="relative group">
              <a
                href={`#${item}`}
                className="relative px-5 py-3 text-black hover:text-blue-900 transition duration-300 rounded-lg"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-900 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-black hover:text-blue-900 transition p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 bg-white border-t border-gray-100 z-40">
          <ul className="space-y-3 text-black font-medium text-base pt-4">
            {navItems.map((item) => (
              <li key={item} className="transition hover:scale-105">
                <a
                  href={`#${item}`}
                  className="block px-5 py-3 rounded-lg hover:bg-blue-100 transition text-black hover:text-blue-900"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
