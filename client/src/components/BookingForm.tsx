import { useState, useEffect } from "react";
import { Container, TextField, Box, Typography, Button, Autocomplete, Stack,Checkbox } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


// Define DeviceStatus enum (unchanged)
enum DeviceStatus {
  _0 = "Inactive",
  _1 = "Active",
  _2 = "Pending",
  _3 = "Out of Stock",
}

// Define DeviceDto type
type DeviceDto = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  status: DeviceStatus;
};

// Mapping object for DeviceStatus labels
const deviceStatusLabels: Record<DeviceStatus, string> = {
  [DeviceStatus._0]: "Inactive",
  [DeviceStatus._1]: "Active",
  [DeviceStatus._2]: "Pending",
  [DeviceStatus._3]: "Out of Stock",
};

const BookingForm = () => {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [period, setPeriod] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<DeviceDto[]>([]);

  // Example list of devices for the Autocomplete component
  const deviceOptions: DeviceDto[] = [
    { id: 1, name: "Device 1", description: "Description of Device 1", quantity: 10, status: DeviceStatus._1 },
    { id: 2, name: "Device 2", description: "Description of Device 2", quantity: 5, status: DeviceStatus._0 },
    { id: 3, name: "Device 3", description: "Description of Device 3", quantity: 3, status: DeviceStatus._2 },
  ];

  // Simulate fetching devices from an API
  useEffect(() => {
    // Replace with actual backend fetch logic
    setSelectedDevices(deviceOptions);
  }, []);

  // Helper function to get status label
  const getDeviceStatusLabel = (status: DeviceStatus): string => {
    return deviceStatusLabels[status] || "Unknown";
  };

  const styles = {
    title: {
      color: "orange",
      fontSize: "4rem",
      textAlign: "center",
      fontWeight: "bold",
    },
    textfield: {
      margin: "3",
      width: "30%",
      fontSize: "0.875rem",
      mr: 10,
    },
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log({ dateTime, period, selectedDevices });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center content horizontally
          mt: 3,
          position: "relative", // Ensure the container is the reference for absolute positioning
          minHeight: "100vh", // Ensure the container takes at least the full viewport height
        }}
      >
        <Typography sx={styles.title}>New Reservation</Typography>

        <Box
        
          component="form"
          sx={{
            mt: 5,
            textAlign: "center",
            width: "100%", // Ensure the form takes full width
          }}
          onSubmit={handleSubmit}
        >
            <Stack>
          
        

          {/* DateTimePicker and Period per hour TextField with /h on the same line */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Center horizontally
              gap: 2, // Add spacing between components
              m:5  
            }}
          >
            {/* DateTimePicker */}
            <DateTimePicker
              label="Date and time*"
              
              value={dateTime}
              onChange={(newValue) => setDateTime(newValue)}
              format="MM/dd/yyyy HH:mm"
              slotProps={{
                textField: {
                  sx: styles.textfield, // Apply custom styles to the TextField
                },
              }}
            />

            {/* Period per hour TextField with /h */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1, // Add spacing between TextField and /h
              }}
            >
              <TextField
                required
                label="Period per hour"
                variant="outlined"
                value={period}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,1}$/.test(value)) { // Allow only one digit (0-9)
                    setPeriod(value);
                  }
                }}
                inputProps={{
                  type: "number",
                  min: 0,
                  max: 9,
                }}
                sx={styles.textfield}
              />
              <Typography>/h</Typography> {/* Add "/h" text */}
            </Box>
          </Box>

          {/* Devices Autocomplete */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={3} sx={{ width: "100%", maxWidth: 500 }}>
              <Autocomplete
                multiple
                id="devices-autocomplete"
                options={deviceOptions}
                getOptionLabel={(option) => option.name || "Unnamed Device"}
                value={selectedDevices}
                onChange={(event, newValue) => setSelectedDevices(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select Devices"
                    placeholder="Devices"
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.name} - {getDeviceStatusLabel(option.status)}
                  </li>
                )}
              />
              {/* Checkboxes */}
                <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                {/* Playing Alone */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox />
                    <Typography>Playing Alone</Typography>
                </Box>

                {/* With Fellows */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Checkbox />
                    <Typography>With fellows</Typography>
                    <TextField
                    required
                    variant="outlined"
                    label="Numbers of fellow players"
                    placeholder="Number of fellow players*"
                    sx={{ width: 120 }} // Aseta sopiva leveys
                    />
                </Box>
                </Box>
            </Stack>
          </Box>
          </Stack>
        </Box>

        {/* Buttons at the bottom-right corner */}
        <Box
          sx={{
            position: "fixed", // Fix the buttons to the viewport
            bottom: 40, // Adjust distance from the bottom
            right: 40, // Adjust distance from the right
            display: "flex",
            gap: 2, // Add spacing between buttons
          }}
        >
          <Button
            sx={{
              background: "white",
              border: "solid black",
              color: "black",
              width: 100,
              height: 60,
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              background: "orange",
              color: "white",
              width: 100,
              height: 62,
            }}
          >
            Create
          </Button>
          
        </Box>
    
      </Container>
    </LocalizationProvider>
  );
};

export default BookingForm;
