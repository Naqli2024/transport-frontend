import axios from "axios";
import Cookies from "js-cookie";
import { PurchaseApiUrl } from "./ApiUrl";
 
const PurchaseService = axios.create({
  baseURL: `${PurchaseApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
PurchaseService.interceptors.request.use(
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
 
export default PurchaseService;
