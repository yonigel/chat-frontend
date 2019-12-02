import * as React from "react";
import "./styles.scss";
import { ChatMessage } from "../chat";
import { RefObject, useEffect } from "react";
import { useStateValue } from "../../state";

interface Props {
  username: string;
  messageList: ChatMessage[];
}

function ChatWindow(props: Props) {
  const [{ theme }, dispatch] = useStateValue();
  const { username, messageList } = props;
  const lastRowRef: RefObject<any> = React.createRef();
  useEffect(() => {
    lastRowRef.current.scrollIntoView();
  });

  useEffect(() => {
    console.log(`I am chat window, and theme just changed to`, theme);
  }, theme);

  const getUsernameFormat = (messageUsername: string) => {
    const isMyUsername = username === messageUsername;
    const regularUsernameformat = `${messageUsername} says:`;
    const myUsernameFormat = `you said:`;
    return isMyUsername ? myUsernameFormat : regularUsernameformat;
  };

  return (
    <div className={"chatWindowContainer"}>
      <div className={"chatMessages"}>
        {messageList.map((message: ChatMessage, index: number) => {
          return (
            <div key={index} className={"singleChatRow"}>
              <div className={"username"}>
                {getUsernameFormat(message.username)}
              </div>
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
