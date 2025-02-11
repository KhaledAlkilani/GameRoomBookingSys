import { PlayersService } from "./services/PlayersService";

export const api = {
  getPlayers: PlayersService.getApiPlayers,
};

export * from "./models/Player";
