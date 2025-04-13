import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { OpenAPI } from "./api/core/OpenAPI.ts";
import "./App.css";
import { appTheme } from "./Themes/themes.ts";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import { LoaderProvider } from "./context/LoaderProvider.tsx";

function initApiHeadersFromStorage() {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${token}`,
    };
  }
}

// Initialize API headers once at startup
initApiHeadersFromStorage();

createRoot(document.getElementById("root")!).render(
  <LoaderProvider>
    <SnackbarProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </SnackbarProvider>
  </LoaderProvider>
);
