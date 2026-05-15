import axios from "axios";
import Cookies from "js-cookie";
import {PaymentApiUrl} from "./ApiUrl";
 
const PaymentService = axios.create({
  baseURL: `${PaymentApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
PaymentService.interceptors.request.use(
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
 
export default PaymentService;
