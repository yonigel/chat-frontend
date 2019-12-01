import * as React from "react";
import "./styles.scss";
import { ChatMessage } from "../chat";
import { RefObject, useEffect } from "react";

interface Props {
  username: string;
  messageList: ChatMessage[];
}

function ChatWindow(props: Props) {
  const { username, messageList } = props;
  const lastRowRef: RefObject<any> = React.createRef();
  useEffect(() => {
    lastRowRef.current.scrollIntoView();
  });
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
        <div className={"singleChatRow"} ref={lastRowRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
