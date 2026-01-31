import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path:"/services"},
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
    
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-black/70 backdrop-blur-md shadow-lg rounded-b-xl border-b border-white/20"
          : "py-4 bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer transition-all duration-300"
        >
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-[#4F46E5] group-hover:text-white transition">Vyapaar</span>
            <span className="text-white/80 group-hover:text-emerald-300 transition">Setu</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white/90">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative font-medium transition ${
                  isActive ? "text-[#4F46E5]" : "hover:text-[#4F46E5]"
                }`
              }
            >
              <span className="relative group">
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 text-[#4F46E5] transition-all group-hover:w-full"></span>
              </span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {menuOpen ? (
            <X
              className="w-7 h-7 text-emerald-300"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="w-7 h-7 text-emerald-300"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black/70 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-4 rounded-b-xl"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block text-white/90 text-lg font-medium hover:text-emerald-300 transition"
              >
                {item.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
