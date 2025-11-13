import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-50 flex flex-col p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">👑 Admin Dashboard</h1>
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => navigate("/admin-dashboard/create-invoice")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-medium"
          >
            Create Invoice
          </button>
          <button
            onClick={() => navigate("/admin-dashboard/all-invoices")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-medium"
          >
            View All Invoices
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-medium"
          >
            Logout
          </button>
        </div>

        {/* Nested Routes Render Here */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
