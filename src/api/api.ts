import axios, { type AxiosRequestHeaders } from "axios";
import type { ApiError } from "../types/product";

const API_BASE_URL = "https://api.mercadolibre.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_MELI_ACCESS_TOKEN;

  if (token && config.headers) {
    (config.headers as AxiosRequestHeaders)[
      "Authorization"
    ] = `Bearer ${token}`;
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
