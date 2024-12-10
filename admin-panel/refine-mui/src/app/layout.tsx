import { RESOURCE_IDENTIFIER } from "@lib/constants/resource";
import { authProvider } from "@lib/providers/auth-provider";
import { DataProviderClient } from "@lib/providers/data-provider/client";
import { DevtoolsProvider } from "@lib/providers/devtools";
import { ThemeProvider } from "@lib/providers/theme";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider, useNotificationProvider } from "@refinedev/mui";
import RouterProvider from "@refinedev/nextjs-router";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <RefineKbarProvider>
            <DevtoolsProvider>
              <RefineSnackbarProvider>
                <Refine
                  routerProvider={RouterProvider}
                  dataProvider={DataProviderClient}
                  authProvider={authProvider}
                  notificationProvider={useNotificationProvider}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    title: {
                      text: "Tusss Project",
                    },
                  }}
                  resources={[
                    {
                      name: RESOURCE_IDENTIFIER.USER,
                      list: "users",
                      create: "users/create",
                      edit: "users/:id/edit",
                      show: "users/:id",
                    },
                  ]}
                >
                  {children}
                  <RefineKbar />
                </Refine>
              </RefineSnackbarProvider>
            </DevtoolsProvider>
          </RefineKbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
