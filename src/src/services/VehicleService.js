import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl, AuthApiUrl, VehicleApiUrl } from "./ApiUrl";

const VehicleService = axios.create({
  baseURL: `${VehicleApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

VehicleService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default VehicleService;