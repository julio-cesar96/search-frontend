import axios from "axios";
import type { ApiError } from "../types/product";

const API_BASE_URL = "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição para adicionar o token
api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_MELI_ACCESS_TOKEN;
  if (token && config.headers && typeof config.headers.set === "function") {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || "An unexpected error occurred",
      error: error.response?.data?.error || "UNKNOWN_ERROR",
      status: error.response?.status || 500,
      cause: error.cause,
    };
    return Promise.reject(apiError);
  }
);
