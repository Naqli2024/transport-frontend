import axios from "axios";
import Cookies from "js-cookie";
import {CustomerApiUrl} from "./ApiUrl";
 
const CustomerService = axios.create({
  baseURL: `${CustomerApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
CustomerService.interceptors.request.use(
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
 
export default CustomerService;
