import { AuthProviderServer } from "@lib/providers/auth-provider";
import { redirect } from "next/navigation";
import React from "react";

export async function ServerAuthenticated({ children }: { children: React.ReactNode }) {
  const { authenticated } = await AuthProviderServer.check();

  if (!authenticated) redirect("/login");

  return <>{children}</>;
}
