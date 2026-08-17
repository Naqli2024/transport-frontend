import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl, AuthApiUrl, DriverApiUrl, VendorApiUrl } from "./ApiUrl";

const VendorService = axios.create({
  baseURL: `${VendorApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

VendorService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default VendorService;