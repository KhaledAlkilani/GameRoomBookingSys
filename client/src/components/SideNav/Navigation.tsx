import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { navButtons } from "./Data";
import { useState } from "react";
import AppTitle from "../../assets/APP-TITLE.svg";

const Navigation = () => {
  const location = useLocation();

  const [focusedButton, setFocusedButton] = useState(location.pathname);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.title}>
        <img src={AppTitle} alt="X Game Room" style={{ textAlign: "center" }} />
      </Box>

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
    </Box>
  );
};

export default Navigation;

const styles = {
  container: {
    width: "17%",
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
};
