"use server";

import { CONFIG } from "@lib/constants/config";
import { AuthProviderServer } from "@lib/providers/auth-provider";
import { SigninInDto } from "@lib/services/dto/signin.in.dto";
import { sign } from "jsonwebtoken";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

export async function login(payload: SigninInDto) {
  // const data = await AuthService.login(payload);

  const data = mockUsers.find((item) => item.email === payload.email);
  console.log("🚀 ~ login: ~ user:", data);

  return sign(data || mockUsers[0], process.env.JWT_SECRET || "fjdia239204euhdfiosfsd", {
    expiresIn: `${CONFIG.JWT_LIFE_TIME}h`,
  });
}

export async function checkLogin() {
  const result = await AuthProviderServer.check();
  return result;
}

export async function getIdentity() {
  const user = await AuthProviderServer.getIdentity();
  return user;
}

export async function getPermissions() {
  const permissions = await AuthProviderServer.getPermissions();
  return permissions;
}
