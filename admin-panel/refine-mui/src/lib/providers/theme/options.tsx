import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#8c4a5d",
    },
    secondary: {
      main: "#75565d",
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
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
