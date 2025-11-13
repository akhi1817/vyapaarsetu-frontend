import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import { toast } from "sonner";

const ProtectedAdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.CHECK_AUTH, { withCredentials: true });
        if (res.data?.user?.role === "admin") {
          setIsAdmin(true);
        } else {
          toast.error("Access denied. Admins only!");
        }
      } catch (err) {
        toast.error("Unauthorized access!");
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!isAdmin) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedAdminRoute;
