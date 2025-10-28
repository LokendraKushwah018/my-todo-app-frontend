"use client";
import type { LoginResponse } from "@/types/auth";

const TOKEN_KEY = "accessToken";
const USER_KEY = "authUser";

export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null);
export const setUser = (user: LoginResponse) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = (): LoginResponse | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};
export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
