import axios from "axios";
import Cookies from "js-cookie";
import {BrokerApiUrl} from "./ApiUrl";
 
const BrokerService = axios.create({
  baseURL: `${BrokerApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
BrokerService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
export default BrokerService;