import { ISteamGame } from "./steam-game.model";

export interface ISteamApiResponse {
  game_count: number;
  games: ISteamGame[];
}