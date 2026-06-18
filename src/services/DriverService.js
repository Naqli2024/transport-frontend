import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl, AuthApiUrl, DriverApiUrl } from "./ApiUrl";

const DriverService = axios.create({
  baseURL: `${DriverApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

DriverService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default DriverService;