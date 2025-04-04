import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DeviceDto, RoomBookingDto } from "../../api";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { api } from "../../api/api";

const initialBooking: RoomBookingDto = {
  duration: "0",
  isPlayingAlone: false,
  fellows: 0,
  devices: [],
};

const BookingForm = () => {
  const [bookRoom, setBookRoom] = useState<RoomBookingDto>({});
  const [allDevices, setAllDevices] = useState<DeviceDto[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    api.DevicesService.getAllDevices() // or however you fetch
      .then((fetchedDevices) => {
        setAllDevices(fetchedDevices);
      })
      .catch((err) => {
        console.error("Error fetching devices:", err);
      });
  }, []);

  const handleDuractionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookRoom({
      ...bookRoom,
      duration: e.target.value,
    });
  };

  const handlePlayingAloneChange = (
    event: React.SyntheticEvent,
    checked: boolean
  ) => {
    // If "Playing alone" is checked, set isPlayingAlone true and reset fellows to 0.
    setBookRoom({
      ...bookRoom,
      isPlayingAlone: checked,
      fellows: checked ? 0 : bookRoom.fellows,
    });
  };

  const handleWithFellowsChange = (
    event: React.SyntheticEvent,
    checked: boolean
  ) => {
    // If "With fellows" is checked then set isPlayingAlone to false.
    setBookRoom({ ...bookRoom, isPlayingAlone: !checked });
  };

  const handleFellowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookRoom({ ...bookRoom, fellows: parseInt(e.target.value) });
  };

  const handleDeviceInputChange = (
    event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  const handleDeviceSelect = (
    event: React.SyntheticEvent,
    newValue: DeviceDto | null
  ) => {
    if (newValue) {
      // Add the newly selected device to bookRoom.devices
      setBookRoom((prev) => ({
        ...prev,
        devices: [...(prev.devices || []), newValue],
      }));
    }
    // Clear the text field
    setInputValue("");
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
                  onChange={() => {}}
                  defaultValue={dayjs()}
                  value={dayjs()}
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
              // The full device list from your backend
              options={allDevices}
              getOptionLabel={(option) => option.name || ""}
              // We always keep the selection "null" so it won't create chips in the field
              value={null}
              inputValue={inputValue}
              onInputChange={handleDeviceInputChange}
              onChange={handleDeviceSelect}
              // Render no chips in the text field
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
                label="Playing alone *"
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
                    value={bookRoom.fellows || 0}
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
        <Button variant="contained" onClick={() => {}} disabled>
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
