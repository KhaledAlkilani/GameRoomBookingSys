import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { RoomBookingDto } from "../../api";

const BookingForm = () => {
  const [formData, setFormData] = useState<RoomBookingDto>({
    bookingDateTime: "",
    duration: "",
    isPlayingAlone: false,
    fellows: 0,
    status: undefined,
  });

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField label="" value={""} onChange={() => {}} required fullWidth />
      <TextField
        label="Date"
        type="date"
        value={""}
        onChange={() => {}}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Time"
        type="time"
        value={""}
        onChange={() => {}}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Duration (hours)"
        type="number"
        value={""}
        onChange={() => {}}
        required
        fullWidth
        inputProps={{ min: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Book Game Room
      </Button>
    </Box>
  );
};

export default BookingForm;
