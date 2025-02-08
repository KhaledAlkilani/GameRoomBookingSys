import { useEffect, useState } from "react";
import { api, Player } from "./api/api";
import { Button } from "@mui/material";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getPlayers()
      .then(setPlayers)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;

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
          {players.map((player) => (
            <li key={player.id}>
              {player.firstName} {player.lastName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
