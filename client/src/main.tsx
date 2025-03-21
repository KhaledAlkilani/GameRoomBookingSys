import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { OpenAPI } from "./api/core/OpenAPI.ts";
import "./App.css";
import { StrictMode } from "react";

function initApiHeadersFromStorage() {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${token}`,
    };
  }
}

// Initialize once at startup
initApiHeadersFromStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
