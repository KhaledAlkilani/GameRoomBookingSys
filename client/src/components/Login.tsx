import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@mui/material";
import { api } from "../api/api";
import { OpenAPI } from "../api/core/OpenAPI";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate email domain
    if (!email.endsWith("@edu.xamk.fi")) {
      setError("Only school emails ending with '@edu.xamk.fi' are allowed.");
      return;
    }
    try {
      // Call the token generation endpoint; note that the generated method expects a query parameter.
      const token = await api.TokenService.getApiTokenGenerate(email);
      // Save token (here we use localStorage, but you may use context or state management)
      localStorage.setItem("jwtToken", token);

      OpenAPI.HEADERS = {
        Authorization: `Bearer ${token}`,
      };

      // Navigate to the profile page
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Error generating token");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="School Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(null);
        }}
        margin="normal"
      />
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Log In
      </Button>
    </Container>
  );
};

export default Login;
