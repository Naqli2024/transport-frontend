import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl, AuthApiUrl, DriverApiUrl, TyreIntelligenceApiUrl } from "./ApiUrl";
import TyreIntelligence from "../pages/Fleet/TyreIntelligence/TyreIntelligence";

const TyreIntelligenceService = axios.create({
  baseURL: `${TyreIntelligenceApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

TyreIntelligenceService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default TyreIntelligenceService;