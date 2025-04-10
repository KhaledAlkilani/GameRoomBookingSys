import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs, { Dayjs } from "dayjs";
import { RoomBookingDto, DeviceDto } from "../../api";

export enum ModalMode {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export interface BookingFormProps {
  mode: ModalMode;
  booking: RoomBookingDto;
  allDevices: DeviceDto[];
  inputValue: string;
  onInputChange: (event: React.SyntheticEvent, value: string) => void;
  onDeviceSelect: (
    event: React.SyntheticEvent,
    value: DeviceDto | null
  ) => void;
  onBookingDateTimeChange: (newValue: Dayjs | null) => void;
  onDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlayingAloneChange: () => void;
  onWithFellowsChange: () => void;
  onFellowsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const BookingForm = (props: BookingFormProps) => {
  const {
    mode,
    booking,
    allDevices,
    inputValue,
    onInputChange,
    onDeviceSelect,
    onBookingDateTimeChange,
    onDurationChange,
    onPlayingAloneChange,
    onWithFellowsChange,
    onFellowsChange,
    onSubmit,
    onCancel,
  } = props;

  return (
    <Box sx={styles.form}>
      <Typography sx={styles.bookgGameRoomTitle}>
        {mode === ModalMode.CREATE ? "Book Game Room" : "Update Booking"}
      </Typography>
      <Box sx={{ width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            orientation="portrait"
            value={
              booking.bookingDateTime ? dayjs(booking.bookingDateTime) : dayjs()
            }
            onChange={onBookingDateTimeChange}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
      </Box>
      <Box width="100%">
        <TextField
          id="outlined-helperText"
          label="Duration *"
          type="number"
          value={booking.duration || ""}
          onChange={onDurationChange}
          variant="standard"
          fullWidth
          inputProps={{ min: 0 }}
        />
      </Box>
      <Box width="100%">
        <Autocomplete
          options={allDevices}
          getOptionLabel={(option) => option.name || ""}
          value={null}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onChange={onDeviceSelect}
          renderTags={() => null}
          renderInput={(params) => (
            <TextField {...params} label="Devices" variant="standard" />
          )}
        />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
          {booking.devices &&
            booking.devices.map((device) => (
              <Chip
                key={device.id}
                label={device.name}
                onDelete={() => {
                  // You might pass an onDeleteDevice prop to remove a device from booking.devices.
                }}
              />
            ))}
        </Box>
      </Box>
      <Box width="100%">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={booking.isPlayingAlone}
                onChange={onPlayingAloneChange}
              />
            }
            label="Playing alone"
            sx={{ width: "30%", marginTop: 1 }}
          />
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2, height: 60 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={!booking.isPlayingAlone}
                  onChange={onWithFellowsChange}
                />
              }
              label="With fellows"
            />
            {!booking.isPlayingAlone && (
              <TextField
                id="outlined-helperText"
                label="How many? *"
                type="number"
                value={booking.fellows || ""}
                onChange={onFellowsChange}
                variant="standard"
                sx={{ marginTop: -2 }}
                inputProps={{ min: 1 }}
              />
            )}
          </Box>
        </FormGroup>
      </Box>
      <Box sx={styles.formButtons}>
        <Button variant="contained" onClick={onSubmit}>
          Save
        </Button>
        <Button
          variant="outlined"
          sx={{ borderColor: "red", color: "red" }}
          onClick={onCancel}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default BookingForm;

const styles = {
  form: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: 3,
  },
  bookgGameRoomTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 32,
    letterSpacing: 1,
  },
  formButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
  },
};
