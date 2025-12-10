import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/authSlice";
import Cookies from "js-cookie";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await axios.get(API_ENDPOINTS.LOGOUT_USER, { withCredentials: true });
      Cookies.remove("token");
      dispatch(logoutSuccess());
      toast.success("Logged out successfully 👋");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-[#ffffff0a] border-b border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <div 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-emerald-400 group-hover:text-black transition">
              Vyapaar
            </span>
            <span className="text-black/80 group-hover:text-emerald-300 transition">
              Setu
            </span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-black/80">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative font-medium transition 
                 ${isActive ? "text-emerald-300" : "hover:text-black"}`
              }
            >
              {/* hover underline */}
              <span className="relative group">
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full"></span>
              </span>
            </NavLink>
          ))}

          {/* Auth Button */}
          {/* {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-red-500/70 hover:bg-red-500 text-white font-medium shadow-md backdrop-blur-md transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 rounded-xl bg-emerald-500/70 hover:bg-emerald-500 text-white font-medium shadow-md backdrop-blur-md transition"
            >
              Login
            </button>
          )} */}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {menuOpen ? (
            <X className="w-7 h-7 text-emerald-300" onClick={() => setMenuOpen(false)} />
          ) : (
            <Menu className="w-7 h-7 text-emerald-300" onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0e0e0e]/70 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-4">

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

          {/* {isLoggedIn ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="w-full bg-red-500/70 hover:bg-red-500 text-white py-2 rounded-xl backdrop-blur-md transition font-medium"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => { navigate("/login"); setMenuOpen(false); }}
              className="w-full bg-emerald-500/70 hover:bg-emerald-500 text-white py-2 rounded-xl backdrop-blur-md transition font-medium"
            >
              Login
            </button>
          )} */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
