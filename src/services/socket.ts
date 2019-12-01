import * as socketIOClient from "socket.io-client";

let socket: any;

export enum SocketEmits {
  ChatMessage = "chat message",
  UserJoined = "user join",
  UserLeft = "user left"
}

export function initSocket(username: string) {
  socket = socketIOClient("http://localhost:5000");
  socket.on("connect", () => {
    socket.emit("username", username);
    console.log("i am connected!", username);
  });

  return socket;

  //   socket.on(SocketEmits.ChatMessage, (msg: string) => {
  //     onMessageCallback(msg);
  //   });
}

// export function onSocketMessageReceived(callback: Function) {
//   socket.on(SocketEmits.ChatMessage, (msg: string) => {
//     callback(msg);
//   });
// }

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
