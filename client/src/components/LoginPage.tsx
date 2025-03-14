import { Container, Typography, TextField, Button, Box, Link } from "@mui/material";
// import '@fontsource/pixelify-sans.css'
import { useState } from "react";
import Header from "./Header";
import { PlayerDto } from "../api";


const LoginPage = () => {

  const [playerInfo, setPlayerInfo] = useState<PlayerDto>({});

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 , fontFamily: "'Pixelify Sans', sans-serif"}}>
        <Typography variant="h3" gutterBottom sx={{ fontFamily: "'Pixelify Sans', sans-serif" }}>
          Welcome to XVent
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            placeholder="Enter your email (must end with edu.xamk.fi)"
            value={playerInfo.email}
            onChange={(e) => setPlayerInfo({...playerInfo, email: e.target.value})}
            margin="normal"
            sx={{ fontFamily: "'Pixelify Sans', sans-serif" }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            placeholder="Enter your password"
            value={""}
            margin="normal"
            helperText="Enter password (min. 8 characters, includes letters & numbers)"
            sx={{ fontFamily: "'Pixelify Sans', sans-serif" }}
          />

          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Link href="/register" underline="hover">
              Register Now
            </Link>
            <Link href="/forgot-password" underline="hover">
              Forgot Password?
            </Link>
          </Box>

          <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "grey", ":hover": { bgcolor: "black" }, fontFamily: "'Pixelify Sans', sans-serif" }}>
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;