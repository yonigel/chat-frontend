import * as React from "react";
import "./styles.scss";
import { ChatMessage } from "../chat";

interface Props {
  username: string;
  messageList: ChatMessage[];
}

function ChatWindow(props: Props) {
  const { username, messageList } = props;
  return (
    <div className={"chatWindowContainer"}>
      <div className={"chatMessages"}>
        {messageList.map((message: ChatMessage, index: number) => {
          return (
            <div key={index} className={"singleChatRow"}>
              <div className={"username"}>{message.username}:</div>
              <div className={"message"}>{message.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatWindow;
