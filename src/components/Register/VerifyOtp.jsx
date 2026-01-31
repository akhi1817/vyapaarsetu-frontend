import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userData = location.state;

  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0A0A0A]">
        <p className="text-red-500 text-lg font-medium">
          Invalid access. Please register again.
        </p>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.VERIFY_OTP, {
        ...userData,
        otp,
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <div className="bg-[#111111] p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-sm text-white">
        <h2 className="text-2xl font-extrabold text-center text-[#4F46E5] mb-6 shimmer-text">
          Verify Your OTP
        </h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-center tracking-widest text-lg"
          />

          {/* Neon-style Verify button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl text-white font-medium shadow-lg flex items-center justify-center transition-all duration-300 ${
              loading
                ? "bg-[#4F46E5]/50 cursor-not-allowed"
                : "bg-[#4F46E5] hover:bg-[#4338CA] hover:shadow-[#4F46E5]/40"
            }`}
          >
            {loading ? "Verifying..." : "Verify & Register"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-5 text-center">
          Didn’t get the OTP?{" "}
          <span className="text-[#4F46E5] font-medium cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
