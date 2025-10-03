import { io } from "socket.io-client";
const baseUrl = import.meta.env.VITE_SERVER_URL;
const socket = io(baseUrl, {
  transports: ["websocket"], // force websocket for stability
  autoConnect: true,
});

export default socket;
