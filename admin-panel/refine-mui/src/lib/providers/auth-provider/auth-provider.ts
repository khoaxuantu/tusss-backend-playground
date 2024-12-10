"use client";

import { checkLogin, getIdentity, getPermissions, login } from "@lib/actions/auth.server";
import type { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const user = await login({ email, password });
    console.log("🚀 ~ login: ~ res:", user);

    if (user) {
      Cookies.set("auth", JSON.stringify(user), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => checkLogin(),
  getPermissions: async () => getPermissions(),
  getIdentity: async () => getIdentity(),
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
