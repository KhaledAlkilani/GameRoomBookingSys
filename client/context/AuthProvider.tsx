// import React, { createContext, useContext, useEffect, useState } from "react";
// import jwt_decode from "../src/jwt-decode-wrapper";
// import Keycloak, { KeycloakInstance, KeycloakConfig } from "keycloak-js";

// // const keycloakConfig: KeycloakConfig = {
// //   url: "http://localhost:8080",
// //   realm: "gameroombookingsys",
// //   clientId: "gameroom-client",
// // };

// // const keycloak = new Keycloak(keycloakConfig);

// // keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
// //   if (authenticated) {
// //     console.log("User is authenticated");
// //   } else {
// //     console.log("User is not authenticated");
// //   }
// // });

// interface AuthContextProps {
//   keycloak: KeycloakInstance | null;
//   authenticated: boolean;
// }

// export const AuthContext = createContext<AuthContextProps>({
//   keycloak: null,
//   authenticated: false,
// });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [keycloak, setKeycloak] = useState<KeycloakInstance | null>(null);
//   const [authenticated, setAuthenticated] = useState<boolean>(false);
//   function parseRolesFromToken(token: string) {
//     const decoded: any = jwt_decode(token);
//     // Check realm roles
//     const realmRoles = decoded?.realm_access?.roles || [];
//     // Check client roles if “admin” is assigned at the client level
//     const clientRoles =
//       decoded?.resource_access?.["gameroom-client"]?.roles || [];
//     return {
//       isAdmin: realmRoles.includes("admin") || clientRoles.includes("admin"),
//     };
//   }
//   useEffect(() => {
//     const keycloakConfig: KeycloakConfig = {
//       url: "http://localhost:8080",
//       realm: "gameroombookingsys",
//       clientId: "gameroom-client",
//     };

//     const keycloakInstance = new Keycloak(keycloakConfig);

//     keycloakInstance
//       .init({
//         onLoad: "check-sso",
//         checkLoginIframe: false,
//       })
//       .then((authenticated) => {
//         setKeycloak(keycloakInstance);
//         setAuthenticated(authenticated);
//       })
//       .catch((err) => console.error("Keycloak initialization error", err));
//   }, []);

//   // keycloakInstance.init({ onLoad: "login-required" }).then((authenticated) => {
//   //   if (authenticated) {
//   //     console.log("User is authenticated");
//   //   } else {
//   //     console.log("User is not authenticated");
//   //   }
//   // });

//   // Add a periodic token refresh mechanism
//   useEffect(() => {
//     if (keycloak) {
//       const refreshInterval = setInterval(() => {
//         keycloak
//           .updateToken(30) // minimum validity in seconds
//           .then((refreshed: boolean) => {
//             if (refreshed) {
//               console.log("Token refreshed", (keycloak as any).token);
//             }
//           })
//           .catch(() => {
//             console.error("Failed to refresh token");
//           });
//       }, 60000);
//       return () => clearInterval(refreshInterval);
//     }
//   }, [keycloak]);

//   if (!keycloak) {
//     return <div>Loading authentication...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ keycloak, authenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import Keycloak, { KeycloakInstance } from "keycloak-js";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { OpenAPI } from "../src/api/core/OpenAPI";
import jwt_decode from "../src/jwt-decode-wrapper";

interface AuthStateProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string | null;
  authenticated: boolean;
  keycloak: KeycloakInstance | null;
  //   authenticated: boolean;
}

interface KeycloakTokenPayload {
  realm_access?: {
    roles?: string[];
  };
  // Add other properties if needed
}

const AuthStateContext = createContext<AuthStateProps | null>(null);

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "gameroombookingsys",
  clientId: "gameroom-client",
});

// function parseRolesFromToken(token: string): { isAdmin: boolean } {
//   const decoded = jwt_decode<KeycloakTokenPayload>(token);
//   const roles = decoded?.realm_access?.roles || [];
//   return {
//     isAdmin: roles.includes("admin"),
//   };
// }

function parseRolesFromToken(token: string) {
  const decoded: any = jwt_decode(token);
  // Check realm roles
  const realmRoles = decoded?.realm_access?.roles || [];
  // Check client roles if “admin” is assigned at the client level
  const clientRoles =
    decoded?.resource_access?.["gameroom-client"]?.roles || [];
  return {
    isAdmin: realmRoles.includes("admin") || clientRoles.includes("admin"),
  };
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Keycloak instance =>", keycloak);
    keycloak
      .init({ onLoad: "login-required" })
      .then((authenticated) => {
        console.log("Keycloak authenticated =>", authenticated);
        setIsAuthenticated(authenticated);
        if (authenticated && keycloak.token) {
          const parsedRoles = parseRolesFromToken(keycloak.token);
          setIsAdmin(parsedRoles.isAdmin);
          setToken(keycloak.token);
        }
      })
      .catch((err) => {
        console.error("Error during keycloak.init:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Whenever `token` changes, update OpenAPI.TOKEN
  useEffect(() => {
    OpenAPI.TOKEN = token || "";
  }, [token]);

  if (isLoading) {
    return <p>Loading Keycloak...</p>;
  }

  useEffect(() => {
    if (token) {
      const decoded: KeycloakTokenPayload = jwt_decode(token);
      console.log("Decoded token:", decoded);
    }
  }, [token]);

  const value: AuthStateProps = {
    isAuthenticated,
    isAdmin,
    token,
    authenticated: isAuthenticated,
    keycloak,
  };

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  const ctx = useContext(AuthStateContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
