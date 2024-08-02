"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { RefineThemes } from "@refinedev/chakra-ui";
import React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={RefineThemes.Blue}>{children}</ChakraProvider>;
}
