// src/types/jwt-decode.d.ts
declare module "jwt-decode" {
  export interface JwtPayload {
    exp?: number;
    iat?: number;
    // other default properties...
  }

  // Extend the default JWT payload to include Keycloak-specific properties
  export interface KeycloakJwtPayload extends JwtPayload {
    realm_access?: {
      roles?: string[];
    };
    resource_access?: {
      [clientId: string]: {
        roles?: string[];
      };
    };
  }

  // Export the decode function as default
  export default function jwt_decode<T = KeycloakJwtPayload>(token: string): T;
}
