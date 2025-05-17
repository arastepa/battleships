import { state } from "./state";
import { WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";

export function handleMessage(ws: WebSocket, msg) {
  switch (msg.type) {
    case "reg":
      // Handle registration/login
      break;
    case "create_room":
      // Handle room creation
      break;
    case "add_user_to_room":
      // Handle joining a room
      break;
    case "add_ships":
      // Handle adding ships
      break;
    case "attack":
      // Handle attack
      break;
    case "randomAttack":
      // Handle random attack
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
