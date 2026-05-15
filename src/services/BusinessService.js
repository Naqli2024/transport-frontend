import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl, BusinessApiUrl, ERPApiUrl } from "./ApiUrl";

const BusinessService = axios.create({
  baseURL: `${BusinessApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default BusinessService;
