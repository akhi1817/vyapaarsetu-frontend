import React, { useState, useContext } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import Cookies from "js-cookie";
import { ThemeContext } from "../../context/ThemeContext";

const Login = () => {
  const { darkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        API_ENDPOINTS.LOGIN_USER,
        { email, password },
        { withCredentials: true }
      );

      const user = res.data.user;
      if (!user) {
        toast.error("User data not found");
        return;
      }

      dispatch(loginSuccess(user));
      Cookies.set("token", res.data.token, { expires: 1 });
      toast.success(res.data.message);

      if (user.role === "admin") navigate("/admin-dashboard");
      else navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Login Card */}
      <div
        className="bg-[#111111] shadow-lg shadow-emerald-500/20 border border-[#1F1F1F] rounded-2xl w-full max-w-sm p-6 animate-fadeIn"
      >
        {/* Header */}
        <h2
          className={`text-2xl font-bold text-center mb-4 ${
            darkMode ? "shimmer-text" : "text-black"
          }`}
        >
          Welcome Back 👋
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Login to manage your account and access all features.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className={`block mb-1 ${
                darkMode ? "shimmer-text text-gray-300" : "text-black"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-black/20 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label
              className={`block mb-1 ${
                darkMode ? "shimmer-text text-gray-300" : "text-black"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-black/20 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-[#4F46E5]/40 transition-all duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-gray-400 text-xs text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/send-otp"
            className="text-[#4F46E5] hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
