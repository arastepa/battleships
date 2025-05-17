import { State } from "./types";
import { WebSocket } from "ws";

export const state: State = {
  players: {},
  rooms: {},
  games: {},
  winners: {},
};

export function addPlayer(name: string, password: string, ws: WebSocket) {
  const index = Math.random().toString(36).substring(7);
  state.players[name] = { name, password, index, wins: 0, ws, attacks: [] };
  return state.players[name];
}
