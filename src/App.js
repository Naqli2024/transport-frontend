import React from "react";
import "../src/assets/styles/transport.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { LoadScript } from "@react-google-maps/api";
import AuthGuard from "./components/AuthGuard";

const libraries = ["places"];

function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthGuard />
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          libraries={libraries}
        >
          <AppRoutes />
          <ToastContainer autoClose={2000} />
        </LoadScript>
      </BrowserRouter>
    </div>
  );
}

export default App;
