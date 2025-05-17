import { WebSocketServer } from "ws";
import { state } from "./state";
import { v4 as uuidv4 } from "uuid";
import { handleMessage } from "./messageHandler";

const WS_PORT = parseInt(process.env.WS_PORT ?? "") || 3000;
const wss = new WebSocketServer({ port: WS_PORT });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      handleMessage(ws, data);
    } catch {
      ws.send(
        JSON.stringify({
          type: "error",
          data: { errorText: "Invalid JSON" },
          id: 0,
        }),
      );
    }
  });

  ws.on("close", () => {
    // Optionally handle disconnects
  });
});

console.log(`WebSocket server started on ws://localhost:${WS_PORT}`);
