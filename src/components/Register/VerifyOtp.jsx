import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../config/api";
import axios from "axios";
import { toast } from "sonner";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, email, password } = location.state || {};

  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINTS.VERIFY_OTP, {
        username,
        email,
        password,
        otp,
      });

      toast.success(response?.data?.message || "Registration complete!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "OTP verification failed");
    }
  };

  if (!username || !email || !password) {
    toast.error("Missing registration details. Please register again.");
    navigate("/register");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center mb-4">
          Verify OTP
        </h2>
        <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none tracking-widest text-center text-lg"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            Verify
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          Didn’t receive OTP?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Go back to Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
