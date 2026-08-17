import axios from "axios";
import Cookies from "js-cookie";
import {BrokerApiUrl, FuelApiUrl} from "./ApiUrl";
 
const FuelService = axios.create({
  baseURL: `${FuelApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
FuelService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
export default FuelService;