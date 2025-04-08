import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { navButtons } from "./Data";
import { useState } from "react";
import AppTitle from "../../assets/APP-TITLE.svg";
import { usePlayerInfo } from "../../hooks/usePlayerInfo";

const Navigation = () => {
  const { playerInfo, error } = usePlayerInfo();
  const location = useLocation();

  const [focusedButton, setFocusedButton] = useState(location.pathname);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.title}>
        <img src={AppTitle} alt="X Game Room" style={{ textAlign: "center" }} />
      </Box>
      {error && <Typography sx={styles.error}>Error: {error}</Typography>}
      <Box sx={styles.navButtons}>
        {navButtons.map((button) => (
          <Button
            key={button.label}
            variant="outlined"
            onFocus={() => setFocusedButton(button.path)}
            sx={{
              borderBottom: focusedButton === button.path ? 3 : undefined,
              fontWeight: focusedButton === button.path ? "bold" : undefined,
              borderColor: "black",
            }}
          >
            <Link to={button.path}>{button.label}</Link>
          </Button>
        ))}
      </Box>
      <Box sx={styles.userNameAndLogoutButton}>
        <Typography sx={styles.username}>
          Username: {playerInfo?.username}
        </Typography>

        <Link to="/">
          <Button sx={styles.logoutButton}>Logout</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Navigation;

const styles = {
  container: {
    width: "20%",
    padding: 3,
    backgroundColor: "#F3A93A",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 4,
  },
  navButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    "& a": {
      textDecoration: "none",
      color: "#000",
    },
  },
  error: {
    color: "red",
    marginBottom: 2,
    fontWeight: "bold",
  },
  userNameAndLogoutButton: {
    position: "absolute",
    bottom: -10,
    left: -5,
    padding: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "20%",
  },
  username: {
    fontStyle: "italic",
    fontSize: 14,
    letterSpacing: 0.5,
    fontWeight: 550,
  },
  logoutButton: {
    textDecoration: "underline",
    fontSize: 16,
    color: "black",
  },
};
