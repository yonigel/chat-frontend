import * as React from "react";
import { useState } from "react";
import "./styles.scss";
import ChatWindow from "../chatWindow";
import Login from "../login";

interface Props {}

function Chat(props: Props) {
  const [isUserLoggedIn, setUserLoggedStatus] = useState(false);
  const [username, setUsername] = useState("");

  const onUserLogin = (username: string) => {
    setUsername(username);
    setUserLoggedStatus(true);
  };

  return (
    <div className={"chatContainer"}>
      {isUserLoggedIn ? (
        <ChatWindow username={username} />
      ) : (
        <Login onUserLogin={onUserLogin} />
      )}
    </div>
  );
}

export default Chat;
