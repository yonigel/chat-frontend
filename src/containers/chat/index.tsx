import * as React from "react";
import { useState, useReducer } from "react";
import "./styles.scss";
import ChatWindow from "../chatWindow";
import Login from "../login";
import UsersWindow from "../usersWindow";
import MessageBox from "../messageBox";

interface Props {}

enum MessageActionTypes {
  Add,
  Delete,
  Update
}

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

  const [messagesList, setMessageList] = useReducer(
    messageReducer,
    fakeMessages
  );

  const onUserLogin = (username: string) => {
    setUsername(username);
    setUserLoggedStatus(true);
  };

  const onMessageSend = (message: string) => {
    setMessageList({
      type: MessageActionTypes.Add,
      payload: { username: "user", message }
    });
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
