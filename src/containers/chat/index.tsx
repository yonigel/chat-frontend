import * as React from "react";
import { useState } from "react";
import "./styles.scss";
import ChatWindow from "../chatWindow";
import Login from "../login";
import UsersWindow from "../usersWindow";
import MessageBox from "../messageBox";

interface Props {}

function Chat(props: Props) {
  const [isUserLoggedIn, setUserLoggedStatus] = useState(true); // false
  const [username, setUsername] = useState("yonigel");

  const onUserLogin = (username: string) => {
    setUsername(username);
    setUserLoggedStatus(true);
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
            <MessageBox />
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
