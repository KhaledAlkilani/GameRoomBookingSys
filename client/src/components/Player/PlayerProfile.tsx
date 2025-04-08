import { Typography, Box, Button, TextField } from "@mui/material";
import { usePlayerInfo } from "../../hooks/usePlayerInfo";
import UnknownProfilePic from "../../assets/UnknownProfilePic.svg";
import { api, PlayerDto } from "../../api/api";
import { useEffect, useState } from "react";
import { usePrompt } from "../../hooks/usePrompt";
import { enqueueSnackbar } from "notistack";

const PlayerProfile = () => {
  const { playerInfo, loading, setPlayerInfo } = usePlayerInfo();

  const [originalPlayerInfo, setOriginalPlayerInfo] =
    useState<PlayerDto | null>(null);

  useEffect(() => {
    if (playerInfo && !originalPlayerInfo) {
      setOriginalPlayerInfo(playerInfo);
    }
  }, [playerInfo, originalPlayerInfo]);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerInfo({
      ...playerInfo,
      username: e.target.value,
    });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerInfo({
      ...playerInfo,
      phoneNumber: e.target.value,
    });
  };

  const handleUpdatePlayerInfo = () => {
    if (playerInfo) {
      api.PlayersService.updatePlayerInfoById(playerInfo.id!, playerInfo)
        .then((updatedPlayer) => {
          setPlayerInfo(updatedPlayer);
          setOriginalPlayerInfo(updatedPlayer);
          enqueueSnackbar("Player info updated successfully", {
            variant: "success",
          });
        })
        .catch((err) => {
          enqueueSnackbar("Error updating player info", {
            variant: "error",
          });
          console.error(
            "Error updating player info. Please try again later.",
            err
          );
        });
    }
  };

  const isChanged =
    playerInfo?.username !== originalPlayerInfo?.username ||
    playerInfo?.phoneNumber !== originalPlayerInfo?.phoneNumber ||
    playerInfo?.pictureUrl !== originalPlayerInfo?.pictureUrl;

  usePrompt(
    "You have unsaved changes. Are you sure you want to leave?",
    isChanged
  );

  return (
    <>
      <Box sx={styles.container}>
        <Box>
          <Typography sx={styles.title}>Profile</Typography>
          <Box sx={styles.form}>
            <TextField
              id="outlined-helperText"
              label="Email"
              value={loading ? "Loading..." : playerInfo?.email || ""}
              variant="standard"
              disabled
            />
            <TextField
              id="outlined-helperText"
              label="Username"
              value={loading ? "Loading..." : playerInfo?.username || ""}
              variant="standard"
              onChange={handleUserNameChange}
            />
            <TextField
              id="outlined-helperText"
              label="Phone number"
              value={loading ? "Loading..." : playerInfo?.phoneNumber || ""}
              variant="standard"
              onChange={handlePhoneNumberChange}
            />
          </Box>
        </Box>

        <Box sx={styles.profilePicAndFormButtons}>
          <img src={UnknownProfilePic} width={"80%"} alt="Profile pic" />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="profile-pic-upload"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log("Selected file:", file);
              }
            }}
          />
          <Box flex={1}>
            <Button variant="text" sx={{ color: "#000", cursor: "pointer" }}>
              <label
                htmlFor="profile-pic-upload"
                style={{ color: "#000", cursor: "inherit" }}
              >
                Edit image
              </label>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.formButtons}>
        <Button
          variant="contained"
          onClick={handleUpdatePlayerInfo}
          disabled={!isChanged}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          sx={{ borderColor: "red", color: "red" }}
          onClick={() => {
            setPlayerInfo(originalPlayerInfo!);
          }}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default PlayerProfile;

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "75% 20%",
    padding: 2,
    height: "calc(100vh - 64px)",
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 32,
    letterSpacing: 1,
    marginBottom: 4,
  },
  form: {
    gap: 3,
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  profilePicAndFormButtons: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
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
