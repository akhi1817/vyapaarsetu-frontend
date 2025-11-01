import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import API_ENDPOINTS from "../../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        API_ENDPOINTS.LOGIN_USER,
        { email, password },
        { withCredentials: true }
      );

      toast.success(response?.data?.message || "Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center mb-2">
          Login
        </h1>
        <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
          Welcome back, you've been missed!
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Register here...
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
