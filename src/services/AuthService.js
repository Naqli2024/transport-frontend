import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl, AuthApiUrl } from "./ApiUrl";

const AuthService = axios.create({
  baseURL: `${AuthApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

AuthService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AuthService;
