import Keycloak from "keycloak-js";
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
