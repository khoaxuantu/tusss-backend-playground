import { RESOURCE_IDENTIFIER } from "@lib/constants/resource";
import { authProvider } from "@lib/providers/auth-provider";
import { DataProviderClient } from "@lib/providers/data-provider/client";
import { DevtoolsProvider } from "@lib/providers/devtools";
import { ThemeProvider } from "@lib/providers/theme/chakra-provider.theme";
import { useNotificationProvider } from "@refinedev/chakra-ui";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Refine",
  description: "Generated by create refine app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <DevtoolsProvider>
              <ThemeProvider>
                <Refine
                  routerProvider={routerProvider}
                  dataProvider={DataProviderClient}
                  authProvider={authProvider}
                  notificationProvider={useNotificationProvider}
                  resources={[
                    {
                      name: RESOURCE_IDENTIFIER.USER,
                      list: "users",
                      create: "users/create",
                      edit: "users/:id/edit",
                      show: "users/:id",
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "AE7LBq-tW8rrA-xr0QMl",
                  }}
                >
                  {children}
                  <RefineKbar />
                </Refine>
              </ThemeProvider>
            </DevtoolsProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
