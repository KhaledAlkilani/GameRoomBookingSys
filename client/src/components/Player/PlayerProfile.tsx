import { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import { api, PlayerDto } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Loader from "../Reusable/Loader";
import { useLoader } from "../../hooks/useLoader";

const PlayerProfile = () => {
  const { loader, setLoader } = useLoader();

  const [player, setPlayer] = useState<PlayerDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/");
      return;
    }
    setLoader(true);
    api.PlayersService.getPlayerInfo()
      .then((playerData) => {
        setPlayer(playerData);
        setLoader(false);
      })
      .catch(() => {
        setError(
          "Server is offline or an error occurred. Please try again later."
        );
        setLoader(false);
      });
  }, [navigate, setLoader]);

  if (error)
    return (
      <Container>
        <Typography sx={{ p: 2, color: "red" }}>{error}</Typography>
      </Container>
    );

  return (
    <Container style={styles.container}>
      <Typography variant="h3">Player Profile</Typography>
      {error ? (
        <Typography sx={styles.error}>Error: {error}</Typography>
      ) : loader ? (
        <Loader />
      ) : player ? (
        <div>
          <Typography variant="body1">Email: {player.email}</Typography>
          <Typography variant="body1">Username: {player.username}</Typography>
          <Typography variant="body1">Phone: {player.phoneNumber}</Typography>
          <Typography variant="body1">Theme: {player.theme}</Typography>
        </div>
      ) : (
        <Typography>No player data found.</Typography>
      )}
    </Container>
  );
};

export default PlayerProfile;

const styles = {
  container: {
    marginTop: "2rem",
  },
  error: {
    color: "red",
  },
};
