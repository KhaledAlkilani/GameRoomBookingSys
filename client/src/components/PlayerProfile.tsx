import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { api, PlayerDto } from "../api/api";

const PlayerProfile = () => {
  const [player, setPlayer] = useState<PlayerDto>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.PlayerService.getPlayerInfo()
      .then(setPlayer)
      .catch(() =>
        setError(
          "Server is offline or an error occurred. Please try again later."
        )
      );
  }, []);

  if (error)
    return <Typography sx={{ p: 2, color: "red" }}>{error}</Typography>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1>Players</h1>
      <div>
        <ul>
          <li key={player.id}>
            {player.email} {player.pictureUrl}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerProfile;
