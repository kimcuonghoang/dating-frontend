import { io } from "socket.io-client";

export const socket = io("https://dating-backend-nhel.onrender.com", {
  withCredentials: true,
  transports: ["websocket"],
});
