import axios from "axios";
import Cookies from "js-cookie";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.skipAuth) {
      return config;
    }

    const token = Cookies.get(AUTH_COOKIE_TOKEN);

    if (!token) {
      return Promise.reject(new Error("Token is missing"));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Removing token.");
      Cookies.remove(AUTH_COOKIE_TOKEN);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
