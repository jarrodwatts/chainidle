import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      paper: "#3a3544",
      default: "#302d2f",
    },
    primary: {
      main: "#ea9c5f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#488d9b",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 1)",
      disabled: "rgba(255, 255, 255, 0.38)",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: [
      "kongtext",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ].join(","),
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1,
      color: "#fff",
    },
    h2: {
      letterSpacing: "-.025em",
      fontWeight: 700,
      fontSize: "2rem",
      color: "#fff",
    },
    h3: {
      color: "#fff",
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.75,
    },
    h4: {
      color: "rgba(255, 255, 255, 0.9)",
      fontWeight: 300,
      fontSize: 20,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.75,
      color: "#d1d5db",
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: 1.75,
      color: "#9CA3AF",
    },
  },

  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
    // Override border color of TextField when it is not focused
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "1px solid hsla(0, 0%, 100%, 0.15)",
          borderRadius: 16,
        },
      },
    },
  },
});

// https://material-ui.com/customization/theming/#responsivefontsizes-theme-options-theme
export default responsiveFontSizes(theme);
