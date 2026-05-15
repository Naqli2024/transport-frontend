import axios from "axios";
import Cookies from "js-cookie";
import { BillApiUrl } from "./ApiUrl";
 
const BillService = axios.create({
  baseURL: `${BillApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
BillService.interceptors.request.use(
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
 
export default BillService;
