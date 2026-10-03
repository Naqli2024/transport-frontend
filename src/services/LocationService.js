import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl, AuthApiUrl, LocationApiUrl } from "./ApiUrl";

const LocationService = axios.create({
  baseURL: `${LocationApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// LocationService.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token"); 
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default LocationService;