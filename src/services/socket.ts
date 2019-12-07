import * as socketIOClient from "socket.io-client";
import { ChatMessage } from "../containers/chat";

let socket: any;

export enum SocketEmits {
  ChatMessage = "chat message",
  UserJoined = "user join",
  UserLeft = "user left",
  GotUserList = "got users list"
}

export function initSocket(username: string) {
  socket = socketIOClient("http://localhost:5000");
  socket.on("connect", () => {
    socket.emit("username", username);
  });

  return socket;
}

export function onSocketUserJoined(callback: Function) {
  socket.on(SocketEmits.UserJoined, () => {
    callback();
  });
}

export function onSocketUsetLeft(callback: Function) {
  socket.on(SocketEmits.UserLeft, () => {
    callback();
  });
}

export function sendSocketMessage(message: string) {
  socket.emit(SocketEmits.ChatMessage, message);
}
