import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#F48FB1", // Strawberry Milkshake Pink
      light: "#F8BBD0", // Lighter shade for contrast
      dark: "#F06292", // Deeper shade for hover/active
    },
    secondary: {
      main: "#CE93D8", // Light Lavender
      light: "#E1BEE7", // Lighter shade
      dark: "#BA68C8", // Deeper shade
    },
    text: {
      primary: "#191c20",
      secondary: "#44474e",
    },
    background: {
      default: "#f9f9ff",
      paper: "#ededf4",
    },
    error: {
      main: "#ba1a1a",
    },
    divider: "#c4c6d0",
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 6,
          fontWeight: "bold",
        },
        sizeMedium: {
          padding: "8px 16px",
        },
        sizeSmall: {
          padding: "6px 12px",
          borderRadius: 9999,
        },
        sizeLarge: {
          padding: "16px 32px",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        paper: {
          marginTop: 8,
          minWidth: 250,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "system-ui",
    h1: {
      fontSize: "3.174em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h2: {
      fontSize: "1.961em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h3: {
      fontSize: "1.47em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h4: {
      fontSize: "1.212em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h5: {
      fontSize: "1.101em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h6: {
      fontSize: "1em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    button: {
      lineHeight: "revert",
      textTransform: "none",
    },
  },
};

export const theme = createTheme(themeOptions);
