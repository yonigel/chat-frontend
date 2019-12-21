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

  const [{}, dispatch] = useStateValue();

  const onUserLeft = (user: User) => {
    if (user.name === "" || user.name === undefined) {
      return;
    }
    dispatch({
      type: UsersActionTypes.DELETE_USER,
      payload: user.id
    });
  };

  const onUserJoin = (user: User) => {
    if (user.name === "" || user.name === undefined) {
      return;
    }
    dispatch({
      type: UsersActionTypes.ADD_USER,
      payload: user
    });
  };

  const onGotUsersList = (usersList: User[]) => {
    if (usersList.length === 0) {
      return;
    }
    dispatch({
      type: UsersActionTypes.SET_USERS_LIST,
      payload: usersList
    });
  };

  const onBotMessage = (message: string) => {
    if (message === "" || message === undefined) {
      return;
    }
    dispatch({
      type: MessageActionTypes.ADD_MESSAGE,
      payload: {
        username: BOT_NAME,
        message
      }
    });
  };

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
    socket.on(SocketEmits.GotUserList, (usersList: User[]) => {
      onGotUsersList(usersList);
    });
    socket.on(SocketEmits.UserJoined, (user: User) => {
      onUserJoin(user);
    });
    socket.on(SocketEmits.UserLeft, (user: User) => {
      onUserLeft(user);
    });
    socket.on(SocketEmits.BotMessage, (message: string) => {
      onBotMessage(message);
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
            <UsersWindow username={username} />
          </div>
          <div className={"chatWindow"}>
            <ChatWindow username={username} />
          </div>
          <div className={"messageContainer"}>
            <div className={"messageBox"}>
              <MessageBox onMessageSend={onMessageSend} />
            </div>
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
