import React from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 👇 logout handler
  const handleLogout = async () => {
    try {
      await axios.get(API_ENDPOINTS.LOGOUT_USER, { withCredentials: true });
      toast.success("Logged out successfully 👋");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          👑 Welcome, Admin!
        </h1>
        <p className="text-gray-600 mb-6">
          You have full access to manage users, sales, and settings.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition font-medium">
            Manage Users
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition font-medium">
            View Reports
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl transition font-medium">
            Settings
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition font-medium">
            Sales Data
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition font-medium">
            Purchase Data
          </button>

          {/* 🔥 Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
