import * as React from "react";
import { useState, useReducer } from "react";
import "./styles.scss";
import ChatWindow from "../chatWindow";
import Login from "../login";
import UsersWindow from "../usersWindow";
import MessageBox from "../messageBox";
import {
  initSocket,
  // onSocketMessageReceived,
  onSocketUserJoined,
  onSocketUsetLeft,
  sendSocketMessage,
  SocketEmits
} from "../../services/socket";
import { MessageActionTypes } from "../../consts/messages";

interface Props {}

export interface ChatMessage {
  username: string;
  message: string;
}

const fakeMessages: ChatMessage[] = [];

for (let i = 0; i < 50; i++) {
  fakeMessages.push({
    username: `fake ${i}`,
    message: `fake message number ${i}`
  });
}

const socket = initSocket("test name");

function Chat(props: Props) {
  const [isUserLoggedIn, setUserLoggedStatus] = useState(true); // false
  const [username, setUsername] = useState("yonigel");

  const messageReducer = (messagesList: ChatMessage[], messageAction: any) => {
    switch (messageAction.type) {
      case MessageActionTypes.Add:
        return [...messagesList, messageAction.payload];
      default:
        return [...messagesList];
    }
  };

  const [messagesList, setMessageList] = useReducer(messageReducer, []);

  const [newMessage, setNewMessage] = useState({ username: "", message: "" });

  React.useEffect(() => {
    console.log(`useEffect`);
    socket.on(SocketEmits.ChatMessage, (msg: any) => {
      // setMessageList({
      //   type: MessageActionTypes.Add,
      //   payload: { username: msg.username, message: msg.message }
      // });
      setNewMessage(msg);
    });
  }, [messagesList]);

  React.useEffect(() => {
    console.log(`use effect of newMessage`);
    setMessageList({
      type: MessageActionTypes.Add,
      payload: { username: newMessage.username, message: newMessage.message }
    });
  }, [newMessage]);

  const onUserLogin = (username: string) => {
    setUsername(username);
    setUserLoggedStatus(true);
  };

  const onMessageSend = (message: string) => {
    // setMessageList({
    //   type: MessageActionTypes.Add,
    //   payload: { username: "user", message }
    // });
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
            <ChatWindow username={username} messageList={messagesList} />
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
