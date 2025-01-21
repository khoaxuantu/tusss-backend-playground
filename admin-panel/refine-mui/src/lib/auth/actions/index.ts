"use server";

import { AuthProviderServer } from "@lib/auth/providers";
import { AuthService } from "@lib/auth/services/auth.service";
import { SigninInDto } from "@lib/auth/services/dto/signin.in.dto";
import { CONFIG } from "@lib/config";
import { sign } from "jsonwebtoken";

export async function login(payload: SigninInDto) {
  const res = await AuthService.login(payload);
  if (!res.ok) return "";

  const data = await res.json();

  return sign(data, process.env.JWT_SECRET || "", { expiresIn: `${CONFIG.JWT_LIFE_TIME}h` });
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
