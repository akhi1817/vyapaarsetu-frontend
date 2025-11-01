import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo Section */}
        <div
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* <img
            src="/src/assets/logo.png"
            alt="VyapaarSetu Logo"
            className="w-38 h-38 object-contain" // 👈 logo ka size yahan badha ya ghata sakte ho
          /> */}
          <h1 className="text-3xl font-bold text-emerald-600">
            Vyapaar<span className="text-slate-700">Setu</span>
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
                  : "text-slate-700 hover:text-emerald-600 transition"
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* <button
            onClick={() => (window.location.href = "/login")}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Login
          </button> */}
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden flex items-center">
          {menuOpen ? (
            <X
              className="w-7 h-7 text-emerald-600 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="w-7 h-7 text-emerald-600 cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-emerald-600 font-semibold"
                  : "block text-slate-700 hover:text-emerald-600"
              }
            >
              {item.name}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              window.location.href = "/login";
            }}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
