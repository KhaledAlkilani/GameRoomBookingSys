import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AuthProvider from "../context/AuthProvider.tsx";
import { APIProvider } from "../context/ApiContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <APIProvider>
        <App />
      </APIProvider>
    </AuthProvider>
  </StrictMode>
);
