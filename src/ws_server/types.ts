export interface Player {
  name: string;
  password: string;
  index: string;
  wins: number;
  ws?: WebSocket;
}

export interface Room {
  roomId: string;
  roomUsers: Player[];
}

export interface Ship {
  position: { x: number; y: number };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
  hits?: number;
}

export interface Game {
  idGame: string;
  players: { [playerId: string]: Player };
  ships: { [playerId: string]: Ship[] };
  currentPlayer: string;
  board: { [playerId: string]: number[][] };
  finished: boolean;
}

export interface State {
  players: { [name: string]: Player };
  rooms: { [roomId: string]: Room };
  games: { [gameId: string]: Game };
  winners: { [name: string]: number };
}
