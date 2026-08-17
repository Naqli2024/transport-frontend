import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl, ERPApiUrl } from "./ApiUrl";

const ERPService = axios.create({
  baseURL: `${ERPApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ERPService;
