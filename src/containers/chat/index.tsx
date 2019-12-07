import * as React from "react";
import { useStateValue } from "../../state";
import { useState, useReducer, useEffect } from "react";
import "./styles.scss";
import ChatWindow from "../chatWindow";
import Login from "../login";
import UsersWindow from "../usersWindow";
import MessageBox from "../messageBox";
import {
  initSocket,
  sendSocketMessage,
  SocketEmits
} from "../../services/socket";
import { MessageActionTypes, UsersActionTypes } from "../../actions";
import { User } from "../../components/usersList";
import { BOT_NAME } from "../../consts/chat";

export interface ChatMessage {
  username: string;
  message: string;
}

function Chat() {
  let socket: any;
  const [isUserLoggedIn, setUserLoggedStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [removedUser, serRemovedUser] = useState({ id: -1 });

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    socket = initSocket(username);
  }, [username]);

  useEffect(() => {
    if (socket === undefined) {
      return;
    }
    socket.on(SocketEmits.ChatMessage, (msg: any) => {
      dispatch({
        type: MessageActionTypes.ADD_MESSAGE,
        payload: msg
      });
    });
    socket.on(SocketEmits.UserJoined, (user: User) => {
      if (user.name === "") {
        return;
      }
      dispatch({
        type: UsersActionTypes.ADD_USER,
        payload: user
      });
      dispatch({
        type: MessageActionTypes.ADD_MESSAGE,
        payload: {
          username: BOT_NAME,
          message: `User ${user.name} has joined!`
        }
      });
    });
    socket.on(SocketEmits.UserLeft, (user: User) => {
      if (user.name === "") {
        return;
      }
      dispatch({
        type: UsersActionTypes.DELETE_USER,
        payload: user.id
      });
      dispatch({
        type: MessageActionTypes.ADD_MESSAGE,
        payload: {
          username: BOT_NAME,
          message: `User ${user.name} has just left the room :(`
        }
      });
    });
  }, []);

  const onUserLogin = (username: string) => {
    setUsername(username);
    setUserLoggedStatus(true);
  };

  const onMessageSend = (message: string) => {
    sendSocketMessage(message);
  };

  const renderChat = () => {
    return (
      <div className={"chat"}>
        <div className={"firstRow"}>
          <div className={"users"}>
            <UsersWindow />
          </div>
          <div className={"chatWindow"}>
            <ChatWindow username={username} />
          </div>
        </div>
        <div className={"secondRow"}>
          <div className={"messageBox"}>
            <MessageBox onMessageSend={onMessageSend} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={"chatContainer"}>
      {isUserLoggedIn ? renderChat() : <Login onUserLogin={onUserLogin} />}
    </div>
  );
}

export default Chat;
