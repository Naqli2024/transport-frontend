import axios from "axios";
import Cookies from "js-cookie";
import { WorkOrderApiUrl } from "./ApiUrl";
 
const WorkOrderService = axios.create({
  baseURL: `${WorkOrderApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
WorkOrderService.interceptors.request.use(
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
 
export default WorkOrderService;
