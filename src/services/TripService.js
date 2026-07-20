import axios from "axios";
import Cookies from "js-cookie";
import { TripsApiUrl } from "./ApiUrl";

const TripService = axios.create({
  baseURL: TripsApiUrl,
});

TripService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default TripService;