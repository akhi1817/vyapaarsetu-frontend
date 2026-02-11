// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-0 w-full z-50">
      <div
        className={`transition-all duration-300 ease-in-out rounded-3xl shadow-lg mx-auto
          ${scrolled ? "w-[90%] md:w-[550px]" : "w-[95%] md:w-[890px]"}
          ${darkMode
            ? "bg-[rgba(0,0,0,0.4)] backdrop-blur-xl"
            : "bg-white/60 backdrop-blur-xl border border-black/10"
          }
        `}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-300 ease-in-out
            ${scrolled ? "h-14 w-[90%] md:w-[400px] px-4" : "h-20 w-[90%] md:w-[880px] px-6"}
          `}
        >
          <div onClick={() => navigate("/")} className="cursor-pointer flex items-center gap-2">
            <h1 className={`font-bold transition-all duration-300 ${scrolled ? "text-lg" : "text-2xl"} ${darkMode ? "text-gray-200" : "text-black"}`}>
              Vyapaar <span className="text-[#4F46E5]">Setu</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative font-medium transition ${
                    isActive
                      ? "text-[#4F46E5]"
                      : darkMode
                      ? "text-gray-300 hover:text-[#4F46E5]"
                      : "text-gray-800 hover:text-[#4F46E5]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-[#4F46E5] text-white hover:bg-[#4338CA] transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-[#4F46E5] text-white"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {menuOpen ? (
              <X className="w-7 h-7 text-[#4F46E5]" onClick={() => setMenuOpen(false)} />
            ) : (
              <Menu className="w-7 h-7 text-[#4F46E5]" onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden px-6 py-6 space-y-4 rounded-b-2xl
                ${darkMode
                  ? "bg-[#4F46E5]/20 backdrop-blur-xl text-white"
                  : "bg-white border border-black/10 text-black"
                }
              `}
            >
              {navItems.map(item => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block text-lg font-medium"
                >
                  {item.name}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
