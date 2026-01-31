import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.SEND_OTP, formData);
      toast.success(res.data.message);
      navigate("/verify-otp", { state: res.data.data });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="bg-[#111111] shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md text-white">
        <h2 className="text-2xl font-extrabold text-center text-[#4F46E5] mb-6 shimmer-text">
          Create Your Account
        </h2>

        <form onSubmit={handleSendOtp} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />

          {/* Neon-style Send OTP button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-25 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-medium shadow-lg transition-all duration-300 ${
              loading
                ? "bg-[#4F46E5]/50 cursor-not-allowed"
                : "bg-[#4F46E5] hover:bg-[#4338CA] hover:shadow-[#4F46E5]/40"
            }`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-5 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#4F46E5] font-medium hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
