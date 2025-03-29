import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { OpenAPI } from "../../api/core/OpenAPI";
import { PlayerDto } from "../../api/api";
import gameRoomImage from "../../assets/gameroomimage.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [playerDto, setPlayerDto] = useState<PlayerDto>({});
  const [error, setError] = useState<string | null>(null);

  //Handle email changes
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPlayerDto((prev) => ({
      ...prev,
      email: event.target.value,
    }));
  };

  // Handle login action
  const handleLogin = async () => {
    // Validate email domain
    if (!playerDto.email?.endsWith("@edu.xamk.fi")) {
      setError("Only university emails are allowed.");
      return;
    }

    try {
      // Call your token generation endpoint
      const token = await api.TokenService.getApiTokenGenerate(
        playerDto.email || ""
      );
      localStorage.setItem("jwtToken", token);

      // Attach token to subsequent requests
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
    <Box sx={styles.background}>
      <Container maxWidth="sm">
        <Paper sx={styles.paper}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Login
          </Typography>

          <TextField
            label="Enter your email (university email only)"
            type="email"
            value={playerDto.email || ""}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
          />
          {/* Password to be added later with keycloak authentication */}
          <TextField
            label="Enter your password"
            type="password"
            value={""}
            onChange={() => {}}
            fullWidth
            margin="normal"
          />

          {error && (
            <Typography color="error" variant="body1" sx={{ mt: 1 }}>
              {"Error: " + error}
            </Typography>
          )}

          {/* Login Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 2, width: "100%" }}
          >
            Login
          </Button>

          <Box sx={styles.linksRow}>
            <Link href="/register" variant="body2">
              register now
            </Link>
            <Link href="/forgot-password" variant="body2">
              forgot password?
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

const styles = {
  background: {
    backgroundImage: `url(${gameRoomImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    p: 4,
    opacity: 0.94,
  },
  linksRow: {
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
  },
};
