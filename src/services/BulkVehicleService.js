import axios from "axios";
import Cookies from "js-cookie";
import { VehicleApiUrl } from "./ApiUrl";
 
const BulkVehicleService = axios.create({
  baseURL: `${VehicleApiUrl}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
 
BulkVehicleService.interceptors.request.use(
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
 
export default BulkVehicleService;
