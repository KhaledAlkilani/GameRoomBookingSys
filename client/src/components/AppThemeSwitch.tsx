import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { usePlayerInfo } from "../hooks/usePlayerInfo";

export const AppThemeSwitch = () => {
  // MUI color scheme hook
  const { mode, setMode } = useColorScheme();

  const { playerInfo } = usePlayerInfo();

  // Local state for the radio buttons (light/dark)
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Initialize local theme from MUI color scheme
    setCurrentTheme(mode === "dark" ? "dark" : "light");
  }, [mode]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.value as "light" | "dark";

    // 1) Update local radio state
    setCurrentTheme(newTheme);

    // 2) Update MUI color scheme
    setMode(newTheme);

    // 3) Persist theme to backend if you have the player’s ID
    if (playerInfo && playerInfo.id) {
      api.PlayersService.updatePlayerInfoById(playerInfo.id, {
        ...playerInfo,
        theme: newTheme,
      })
        .then(() => {
          console.log("Theme updated successfully in backend.");
        })
        .catch((err) => {
          console.error("Error updating theme:", err);
        });
    }
  };

  return (
    <FormControl>
      <Typography mb={1} mt={2} id="demo-theme-toggle">
        Theme
      </Typography>
      <RadioGroup
        aria-labelledby="demo-theme-toggle"
        name="theme-toggle"
        row
        value={currentTheme}
        onChange={handleThemeChange}
      >
        <FormControlLabel value="light" control={<Radio />} label="Light" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
      </RadioGroup>
    </FormControl>
  );
};
