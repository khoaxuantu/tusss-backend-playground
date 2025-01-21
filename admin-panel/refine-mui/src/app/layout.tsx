import { authProvider } from "@lib/auth/providers";
import { ThemeProvider } from "@lib/mui/theme";
import { RESOURCE_IDENTIFIER } from "@lib/resource/constants";
import { DataProviderClient } from "@lib/resource/providers/client";
import { DevtoolsProvider } from "@lib/shared/components/Devtools";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider, useNotificationProvider } from "@refinedev/mui";
import RouterProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tusss Admin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Suspense>
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
                        edit: "users/edit/:id",
                        show: "users/show/:id",
                      },
                    ]}
                  >
                    {children}
                    <RefineKbar />
                  </Refine>
                </RefineSnackbarProvider>
              </DevtoolsProvider>
            </RefineKbarProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
