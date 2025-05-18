import { handleAttackMsg } from "./handlers/handleAttackMsg";
import { handleRoomMessage } from "./handlers/roomHandler";
import { handleShipsMessage } from "./handlers/shipsHandler";
import { addPlayer, state } from "./state";
import { WebSocket } from "ws";

export function broadcastRooms() {
  const rooms = Object.values(state.rooms)
    .filter((room) => room.roomUsers.length === 1)
    .map((room) => ({
      roomId: room.roomId,
      roomUsers: room.roomUsers.map((u) => ({ name: u.name, index: u.index })),
    }));
  const msg = JSON.stringify({
    type: "update_room",
    data: JSON.stringify(rooms),
    id: 0,
  });
  Object.values(state.players).forEach((p) => p.ws?.send(msg));
}

function broadcastWinners() {
  const winners = Object.entries(state.winners).map(([name, wins]) => ({
    name,
    wins,
  }));
  const msg = JSON.stringify({
    type: "update_winners",
    data: JSON.stringify(winners),
    id: 0,
  });
  Object.values(state.players).forEach((p) => p.ws?.send(msg));
}

export function handleMessage(
  ws: WebSocket,
  msg: { type: string; data: string; id: number },
) {
  switch (msg.type) {
    case "reg": {
      const { name, password } = JSON.parse(msg.data);
      if (!name || !password) {
        ws.send(
          JSON.stringify({
            type: "reg",
            data: {
              name,
              index: "",
              error: true,
              errorText: "Name and password required",
            },
            id: 0,
          }),
        );
        return;
      }
      let player = state.players[name];
      if (!player) {
        player = addPlayer(name, password, ws);
      }
      console.log("Player registered:", player);
      ws.send(
        JSON.stringify({
          type: "reg",
          data: JSON.stringify({
            name,
            index: player.index,
            error: false,
            errorText: "",
          }),
          id: 0,
        }),
      );
      broadcastRooms();
      broadcastWinners();
      break;
    }

    case "create_room":
    case "add_user_to_room":
      handleRoomMessage(ws, msg);
      break;
    case "add_ships":
      handleShipsMessage(ws, msg);
      break;
    case "attack":
    case "randomAttack":
      handleAttackMsg(ws, msg);
      break;
    default:
      ws.send(
        JSON.stringify({
          type: "error",
          data: { errorText: "Unknown command" },
          id: 0,
        }),
      );
  }
}
