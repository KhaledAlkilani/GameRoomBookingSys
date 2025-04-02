import { Button, Typography, TextField, Container, Box } from "@mui/material";
import "@fontsource/press-start-2p"; // Import the pixel font

const Signup = () => {
  return (
    <Box sx={styles.background}>
      <Container sx={styles.paper}>
        <Box>
          <Typography sx={styles.title}>Signup</Typography>
          <Typography sx={styles.subtitle}>
            Let’s set up your account.
          </Typography>
        </Box>
        <Box sx={styles.input}>
          <Typography sx={styles.label}>Email:</Typography>
          <TextField
            sx={styles.textField}
            type="email"
            id="email"
            name="email"
            placeholder="example@edu.xamk.fi"
            InputProps={{
              sx: { fontFamily: "'Press Start 2P', cursive", fontSize: "12px" },
            }}
            required
          />
        </Box>
        <Box sx={styles.input}>
          <Typography sx={styles.label}>Password:</Typography>
          <TextField
            sx={styles.textField}
            type="password"
            id="password"
            name="password"
            placeholder="At least 8 characters"
            InputProps={{
              sx: { fontFamily: "'Press Start 2P', cursive", fontSize: "12px" },
            }}
            required
          />
        </Box>
        <Button sx={styles.button} type="submit">
          Signup
        </Button>
      </Container>
    </Box>
  );
};
export default Signup;

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "orange", // Keep the orange theme
  },
  paper: {
    padding: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    backgroundColor: "white",
    width: "35%", // Slightly narrower for a professional look
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.3)", // Stronger shadow for depth
  },
  title: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "28px", // Larger font for the title
    marginBottom: "16px",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "16px",
    marginBottom: "24px",
    color: "#555",
    textAlign: "center",
  },
  label: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "14px",
    marginBottom: "8px",
    color: "#333",
  },
  textField: {
    width: "100%",
    marginBottom: "16px",
  },
  helperText: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "12px",
    color: "#777",
    marginTop: "-8px",
    marginBottom: "16px",
  },
  input: {
    marginBottom: 3,
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "16px", // Slightly larger button text
    padding: "12px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
};