import axios from "axios";
import Cookies from "js-cookie";
import { SupplierApiUrl } from "./ApiUrl";
 
const SupplierService = axios.create({
  baseURL: `${SupplierApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
SupplierService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
export default SupplierService;
