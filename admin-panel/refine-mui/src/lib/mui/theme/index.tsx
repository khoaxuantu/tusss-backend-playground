"use client";

import CssBaseLine from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import React from "react";
import { theme } from "./options";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseLine />
      {children}
    </MuiThemeProvider>
  );
}
