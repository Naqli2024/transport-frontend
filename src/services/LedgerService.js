import axios from "axios";
import Cookies from "js-cookie";
import { LedgerApiUrl } from "./ApiUrl";
 
const LedgerService = axios.create({
  baseURL: `${LedgerApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
LedgerService.interceptors.request.use(
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
 
export default LedgerService;
