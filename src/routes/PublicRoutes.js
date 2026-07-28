import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const PublicRoutes = ({ children }) => {
  const token = Cookies.get("token");

  if (token) {
    return;
    <Navigate to="/transport/dashboard" replace />;
  }
  return children;
};

export default PublicRoutes;
