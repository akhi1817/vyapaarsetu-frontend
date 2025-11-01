// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists → show children
  return children;
};

export default ProtectedRoute;
