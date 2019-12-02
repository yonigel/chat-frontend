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
import { usersReducer } from "../../reducers/usersReducer";
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
  const [usersList, setUsersList] = useReducer(usersReducer, []);
  const [newUser, setNewUser] = useState({ name: "", id: -1 });
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
        type: MessageActionTypes.Add,
        payload: msg
      });
    });
    socket.on(SocketEmits.UserJoined, (user: User) => {
      setNewUser(user);
      console.log(`user ${user.id} joined`);
    });
    socket.on(SocketEmits.UserLeft, (userId: number) => {
      console.log(`user id ${userId} has left`);
      serRemovedUser({ id: userId });
    });
  }, []);

  useEffect(() => {
    setUsersList({
      type: UsersActionTypes.Remove,
      payload: removedUser
    });
  }, [removedUser]);

  useEffect(() => {
    if (newUser.name === "" || newUser.name === username) {
      return;
    }
    setUsersList({
      type: UsersActionTypes.Add,
      payload: { name: newUser.name, id: newUser.id }
    });
    dispatch({
      type: MessageActionTypes.Add,
      payload: {
        username: BOT_NAME,
        message: `User ${newUser.name} has joined!`
      }
    });
  }, [newUser]);

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
            <UsersWindow usersList={usersList} />
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
