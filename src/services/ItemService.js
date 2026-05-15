import axios from "axios";
import Cookies from "js-cookie";
import {ItemsApiUrl } from "./ApiUrl";
 
const ItemService = axios.create({
  baseURL: `${ItemsApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
 
ItemService.interceptors.request.use(
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
 
export default ItemService;
