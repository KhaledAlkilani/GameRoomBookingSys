import { Box, Button, Typography } from "@mui/material";
import { RoomBookingDto } from "../../api";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

const Bookings = () => {
  const [bookings, setBookings] = useState<RoomBookingDto[]>([]);

  useEffect(() => {
    api.RoomBookingsService.getUpcomingBookings()
      .then((fetchedBookings) => {
        setBookings(fetchedBookings);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, []);

  return (
    <Box sx={styles.constainer}>
      <Typography sx={styles.title}>Bookings</Typography>
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
