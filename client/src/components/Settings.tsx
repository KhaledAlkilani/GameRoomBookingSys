import { AppThemeSwitch } from "./AppThemeSwitch";
import { Box, Typography } from "@mui/material";

const Settings = () => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>Settings</Typography>
      <AppThemeSwitch />
    </Box>
  );
};

export default Settings;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 2,
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 32,
    letterSpacing: 1,
    marginBottom: 4,
  },
};
