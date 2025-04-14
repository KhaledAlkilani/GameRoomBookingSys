// usePlayerInfo.ts
import { useState, useEffect, createContext, useContext } from "react";
import { api, PlayerDto } from "../api/api";

const PlayerInfoContext = createContext<{
  playerInfo: PlayerDto | null;
  setPlayerInfo: (player: PlayerDto | null) => void;
}>({
  playerInfo: null,
  setPlayerInfo: () => {},
});

export const PlayerInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerDto | null>(null);

  useEffect(() => {
    api.PlayersService.getPlayerInfo()
      .then((playerData) => {
        setPlayerInfo(playerData);
      })
      .catch((err) => {
        console.error("Error fetching player info:", err);
      });
  }, []);

  return (
    <PlayerInfoContext.Provider value={{ playerInfo, setPlayerInfo }}>
      {children}
    </PlayerInfoContext.Provider>
  );
};

export const usePlayerInfo = () => {
  return useContext(PlayerInfoContext);
};
