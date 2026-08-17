import axios from "axios";
import Cookies from "js-cookie";
import { TripsApiUrl } from "./ApiUrl";

 
const BulkService = axios.create({
  baseURL: `${TripsApiUrl}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
 
BulkService.interceptors.request.use(
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
 
export default BulkService;
