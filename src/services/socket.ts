import * as socketIOClient from "socket.io-client";
import { ChatMessage } from "../containers/chat";

let socket: any;

export enum SocketEmits {
  ChatMessage = "chat message",
  UserJoined = "user join",
  UserLeft = "user left",
  GotUserList = "got users list",
  BotMessage = "bot message"
}

export function initSocket(username: string) {
  socket = socketIOClient("http://localhost:5000");
  socket.on("connect", () => {
    socket.emit("username", username);
  });

  return socket;
}

export function sendSocketMessage(message: string) {
  socket.emit(SocketEmits.ChatMessage, message);
}
