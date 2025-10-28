"use client";
import api from "./axios";
import Cookies from "js-cookie";
import { setToken, setUser, getUser, clearAuth } from "./storage";
import type { LoginResponse, User } from "@/types/auth";

export async function login(username: string, password: string) {
  // DummyJSON: POST /auth/login -> { accessToken, refreshToken, ...user }
  const { data } = await api.post<LoginResponse>("/auth/login", { username, password });
  const token = (data as any).accessToken || (data as any).token; // fallback
  if (!token) throw new Error("No token returned from API");

  setToken(token);
  setUser(data);
  Cookies.set("accessToken", token, { sameSite: "lax" }); // optional cookie for SSR if needed
  return data;
}

export async function signup(payload: Partial<User>) {
  // DummyJSON doesn’t issue token on signup. We create user, then redirect to login.
  // POST /users/add
  const { data } = await api.post("/users/add", payload);
  return data;
}

export function logout() {
  clearAuth();
  Cookies.remove("accessToken");
}

export function currentUser() {
  return getUser();
}

export function isAuthed() {
  return !!(typeof window !== "undefined" && localStorage.getItem("accessToken"));
}
