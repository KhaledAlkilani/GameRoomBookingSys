import { Box, Typography } from "@mui/material";

const Bookings = () => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>Bookings Component</Typography>
    </Box>
  );
};

export default Bookings;

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
