import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl, AuthApiUrl, DriverApiUrl, VendorApiUrl, VendorVehicleApiUrl } from "./ApiUrl";

const VendorVehicleService = axios.create({
  baseURL: `${VendorVehicleApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

VendorVehicleService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default VendorVehicleService;