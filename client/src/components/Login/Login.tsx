import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { OpenAPI } from "../../api/core/OpenAPI";
import { PlayerDto } from "../../api/api";
import gameRoomImage from "../../assets/gameroomimage.svg";
import RegistrationModal from "./RegistrationModal";
import { enqueueSnackbar } from "notistack";
import AppTitleColored from "../../assets/APP-TITLE-COLORED.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [playerDto, setPlayerDto] = useState<PlayerDto>({});
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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

  const handleRegisterSend = async (email: string) => {
    try {
      await api.RegistrationService.sendRegistrationLink({ email });
      enqueueSnackbar(`Registration link sent to ${email}`, {
        variant: "success",
      });
    } catch (e: any) {
      console.error("Error sending registration link:", e);
      enqueueSnackbar(e?.message || "Error sending registration link", {
        variant: "error",
      });
    }
  };

  return (
    <Box sx={styles.background}>
      <Container maxWidth="sm">
        <Paper sx={styles.paper}>
          <Box sx={styles.titleAndLogo}>
            <Typography variant="h5" sx={styles.title}>
              Log in to
            </Typography>
            <img src={AppTitleColored} alt="X Game Room" width={200} />
          </Box>

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
            <Button onClick={() => setIsRegisterOpen(true)}>
              register now
            </Button>
            <Button>forgot password?</Button>
          </Box>
        </Paper>
      </Container>
      {/* Registration Modal */}
      <RegistrationModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSend={handleRegisterSend}
      />
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
    p: 3,
    opacity: 0.94,
  },
  linksRow: {
    display: "flex",
    justifyContent: "space-between",
    mt: 1,
  },
  titleAndLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
  },
  title: {
    mr: 1,
    textAlign: "center",
  },
};
