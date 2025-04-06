import { Box, Typography } from "@mui/material";
import { RoomBookingDto } from "../../api";
import { useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState<RoomBookingDto[]>([]);

  return (
    <Box sx={styles.constainer}>
      <Typography sx={styles.title}>Bookings</Typography>
      <Box sx={styles.bookingLists}>
        <Box sx={{ backgroundColor: "yellow" }}>
          <Typography>Upcoming bookings</Typography>
        </Box>
        <Box sx={{ backgroundColor: "lightblue" }}>
          <Typography>Ongoing bookings</Typography>
        </Box>
        <Box sx={{ backgroundColor: "orange" }}>
          <Typography>Past bookings</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Bookings;

const styles = {
  constainer: {
    padding: 2,
    height: "calc(100vh - 64px)",
  },
  bookingLists: {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    // height: "calc(100vh - 64px)",
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 32,
    letterSpacing: 1,
    marginBottom: 4,
  },
};
