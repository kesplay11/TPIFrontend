// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(0, 89, 255, 1)",
    },
  },
   components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // ← Esto quita las mayúsculas globalmente
        },
      },
    },
  },
});

export default theme;
