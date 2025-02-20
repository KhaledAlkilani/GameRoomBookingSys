import { Container, Typography, TextField, Button, Box, Link } from "@mui/material";
import { useState } from "react";
import Header from "./Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to XVent
        </Typography>
        <Typography variant="h6">
          Your ultimate event management system. <br /> Please log in to access your account and manage your events with ease.
        </Typography>

        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            placeholder="Enter your email (must end with edu.xamk.fi)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            helperText="Enter password (min. 8 characters, includes letters & numbers)"
          />

          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Link href="/register" underline="hover">
              Register Now
            </Link>
            <Link href="/forgot-password" underline="hover">
              Forgot Password?
            </Link>
          </Box>

          <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "grey", ":hover": { bgcolor: "black" } }}>
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;