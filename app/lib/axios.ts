"use client";
import axios from "axios";
import { getToken } from "./storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "https://dummyjson.com",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    // DummyJSON uses Bearer <accessToken>
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
