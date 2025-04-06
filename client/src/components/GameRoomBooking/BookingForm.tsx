import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DeviceDto, RoomBookingDto } from "../../api";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { api } from "../../api/api";

const initialBooking: RoomBookingDto = {
  duration: undefined,
  isPlayingAlone: true,
  fellows: undefined,
  devices: [],
};

const BookingForm = () => {
  const [bookRoom, setBookRoom] = useState<RoomBookingDto>(initialBooking);
  const [allDevices, setAllDevices] = useState<DeviceDto[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    api.DevicesService.getAllDevices()
      .then((fetchedDevices) => {
        setAllDevices(fetchedDevices);
      })
      .catch((err) => {
        console.error("Error fetching devices:", err);
      });
  }, []);

  const handleBookingDateTimeChange = (newValue: Dayjs | null) => {
    setBookRoom((prev) => ({
      ...prev,
      bookingDateTime: newValue ? newValue.format("YYYY-MM-DDTHH:mm") : "",
    }));
  };

  const handleDuractionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Parse the value as a number (representing hours)
    const numHours = parseInt(value, 10);
    if (!isNaN(numHours)) {
      // Store the duration as a number (in hours)
      setBookRoom({
        ...bookRoom,
        duration: numHours,
      });
    } else {
      // Fallback: set duration to undefined if parsing fails
      setBookRoom({
        ...bookRoom,
        duration: undefined,
      });
    }
  };

  const handlePlayingAloneChange = () => {
    setBookRoom((prev) => ({
      ...prev,
      isPlayingAlone: true,
      fellows: 0,
    }));
  };

  const handleWithFellowsChange = () => {
    setBookRoom((prev) => ({
      ...prev,
      isPlayingAlone: false,
      fellows: undefined,
    }));
  };

  const handleFellowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookRoom({ ...bookRoom, fellows: parseInt(e.target.value) });
  };

  const handleDeviceInputChange = (
    _: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  const handleDeviceSelect = (
    _: React.SyntheticEvent,
    newValue: DeviceDto | null
  ) => {
    if (newValue) {
      setBookRoom((prev) => ({
        ...prev,
        devices: [...(prev.devices || []), newValue],
      }));
    }
    setInputValue("");
  }; 

  const checkFieldsValidation = (): boolean => {
    const isBookingDateTimeValid =
      bookRoom.bookingDateTime !== initialBooking.bookingDateTime;

    const durationNumber = parseInt(String(bookRoom.duration ?? ""), 10);
    const isDurationValid =
      !isNaN(durationNumber) &&
      durationNumber > 0 &&
      bookRoom.duration !== initialBooking.duration;

    const isFellowsValid =
      bookRoom.isPlayingAlone ||
      (bookRoom.fellows !== undefined &&
        bookRoom.fellows > 0 &&
        bookRoom.fellows !== initialBooking.fellows);

    return isBookingDateTimeValid && isDurationValid && isFellowsValid;
  };

  const handleRoomBooking = async () => {
    if (checkFieldsValidation()) {
      try {
        const response = await api.RoomBookingsService.bookGameRoom(bookRoom);
        console.log("Room booked successfully:", response);
      } catch (error) {
        console.error("Error booking room:", error);
      }
    }
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box>
          <Typography sx={styles.title}>Book Game Room</Typography>
          <Box sx={styles.formCalendarAndDuration}>
            <Box height={"100%"}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  orientation="portrait"
                  value={
                    bookRoom.bookingDateTime
                      ? dayjs(bookRoom.bookingDateTime)
                      : dayjs()
                  }
                  onChange={handleBookingDateTimeChange}
                  localeText={{ toolbarTitle: "" }}
                  slots={{
                    actionBar: () => null,
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </Box>
        <Box sx={styles.bookingFormRightSide}>
          <Box width="100%">
            <TextField
              id="outlined-helperText"
              label="Duration *"
              type="number"
              value={bookRoom.duration}
              onChange={handleDuractionChange}
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
              onInputChange={handleDeviceInputChange}
              onChange={handleDeviceSelect}
              renderTags={() => null}
              renderInput={(params) => (
                <TextField {...params} label="Devices" variant="standard" />
              )}
            />
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
              {bookRoom.devices?.map((device) => (
                <Chip
                  key={device.id}
                  label={device.name}
                  onDelete={() =>
                    setBookRoom((prev) => ({
                      ...prev,
                      devices: prev.devices?.filter((d) => d.id !== device.id),
                    }))
                  }
                />
              ))}
            </Box>
          </Box>
          <Box width="100%">
            <FormGroup>
              {/* Playing alone checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bookRoom.isPlayingAlone}
                    onChange={handlePlayingAloneChange}
                  />
                }
                label="Playing alone"
                sx={{ width: "30%", marginTop: 1 }}
              />

              {/* With fellows checkbox */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  height: 60,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!bookRoom.isPlayingAlone}
                      onChange={handleWithFellowsChange}
                    />
                  }
                  label="With fellows"
                />
                {!bookRoom.isPlayingAlone && (
                  <TextField
                    id="outlined-helperText"
                    label="How many? *"
                    type="number"
                    value={bookRoom.fellows}
                    onChange={handleFellowsChange}
                    variant="standard"
                    sx={{ marginTop: -2 }}
                    inputProps={{ min: 1 }}
                  />
                )}
              </Box>
            </FormGroup>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.formButtons}>
        <Button
          variant="contained"
          onClick={handleRoomBooking}
          disabled={!checkFieldsValidation()}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          sx={{ borderColor: "red", color: "red" }}
          onClick={() => {}}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default BookingForm;

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "40% 50%",
    padding: 2,
    height: "calc(100vh - 64px)",
    gap: 8,
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 32,
    letterSpacing: 1,
    marginBottom: 4,
  },
  formCalendarAndDuration: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  bookingFormRightSide: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    p: 2,
    gap: 3,
  },
  formButtons: {
    display: "flex",
    gap: 2,
    position: "sticky",
    zIndex: 1,
    bottom: 40,
    right: 120,
    float: "right",
  },
};
