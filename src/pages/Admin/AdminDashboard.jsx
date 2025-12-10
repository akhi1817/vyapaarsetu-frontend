import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";
      import { Plus, List, LogOut } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 mt-20">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-6xl mx-auto">
<h1   style={{ fontFamily: "Anton, sans-serif", fontWeight: 700 }} className="text-4xl font-extrabold bg-linear-to-r from-amber-500 to-yellow-400 text-transparent bg-clip-text">
   Admin Dashboard
</h1>



<div className="flex gap-4 mb-6 flex-wrap mt-4">

  {/* Create Invoice */}
  <button
    onClick={() => navigate("/admin-dashboard/create-invoice")}
    className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 px-5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
  >
    <Plus size={18} />
    Create Invoice
  </button>

  {/* View All Invoices */}
  <button
    onClick={() => navigate("/admin-dashboard/all-invoices")}
    className="flex items-center gap-2 bg-linear-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white py-2.5 px-5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
  >
    <List size={18} />
    View All Invoices
  </button>

  {/* Logout */}
  <button
    onClick={handleLogout}
    className="flex items-center gap-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 px-5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
  >
    <LogOut size={18} />
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
