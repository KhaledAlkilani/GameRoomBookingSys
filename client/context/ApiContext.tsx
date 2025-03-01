import React, { createContext, useContext, useEffect } from "react";
import { OpenAPI } from "../src/apiConfig";
import { useAuth } from "../context/AuthProvider";

// We don't expose any service calls—just an empty context
type APIContextProps = {};

export const APIContext = createContext<APIContextProps>({});

export function APIProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  useEffect(() => {
    OpenAPI.BASE = "http://localhost:5025";
    OpenAPI.TOKEN = token || "";
  }, [token]);

  return <APIContext.Provider value={{}}>{children}</APIContext.Provider>;
}

export function useAPI() {
  return useContext(APIContext);
}
