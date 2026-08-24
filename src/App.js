import React, { useEffect, useState } from "react";
import "../src/assets/styles/transport.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/Approutes";
import { ToastContainer } from "react-toastify";
import { LoadScript } from "@react-google-maps/api";
import AuthGuard from "./components/AuthGuard";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { getUserById } from "./redux/Auth/AuthSlice";
import { getGoogleMapsKey } from "./config/googleMaps";

const libraries = ["places"];

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  const admin = useSelector((state) => state.authAdmin.admin);

  const [initializing, setInitializing] = useState(true);

  const token = Cookies.get("token");

  const businessId = admin?.user?.businessId;
  
  const googleMapsApiKey = getGoogleMapsKey(businessId);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token && !admin) {
          await dispatch(getUserById()).unwrap();
        }
      } catch (error) {
        console.error(
          "Authentication initialization failed:",
          error
        );

        Cookies.remove("token");
      } finally {
        setInitializing(false);
      }
    };

    initializeAuth();
  }, [token, admin, dispatch]);

  const isLoginPage =
    location.pathname === "/" ||
    location.pathname === "/transport" ||
    location.pathname === "/transport/";

  if (isLoginPage && !token) {
    return (
      <>
        <AppRoutes />
        <ToastContainer autoClose={2000} />
      </>
    );
  }

  if (initializing || (token && !googleMapsApiKey)) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading your account...
      </div>
    );
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={libraries}
      >
        <AppRoutes />
      </LoadScript>

      <ToastContainer autoClose={2000} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter
      basename={process.env.REACT_APP_BASE_PATH || "/"}
    >
      <AppContent />
    </BrowserRouter>
  );
}

export default App;