import { useEffect, useState } from "react";
import { api, PlayerDto } from "../api/api";

export const usePlayerInfo = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerDto | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.PlayersService.getPlayerInfo()
      .then((playerData) => {
        setPlayerInfo(playerData);
        setLoading(false);
      })
      .catch(() => {
        setError(
          "Server is offline or an error occurred. Please try again later."
        );
        setLoading(false);
      });
  }, []);

  return { playerInfo, error, loading, setPlayerInfo };
};
