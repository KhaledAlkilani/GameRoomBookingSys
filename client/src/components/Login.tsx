import React from "react";
import { useAuth } from "../../context/AuthProvider";

const Login: React.FC = () => {
  const { keycloak, authenticated } = useAuth();

  return (
    <div>
      {authenticated ? (
        <>
          <h2>Welcome, {keycloak?.tokenParsed?.preferred_username}</h2>
          <button onClick={() => keycloak?.logout()}>Logout</button>
        </>
      ) : (
        <button onClick={() => keycloak?.login()}>Login</button>
      )}
    </div>
  );
};

export default Login;
