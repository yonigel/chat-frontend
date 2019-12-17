import * as React from "react";
import "./styles.scss";
import { ChatMessage } from "../chat";
import { RefObject, useEffect, useState } from "react";
import { useStateValue } from "../../state";
import { User } from "../../components/usersList";

interface Props {
  username: string;
}

const USER_DEFAULT_LEFT_OFFSET = 22;

function ChatWindow(props: Props) {
  const [{ connectedUsers, chatMessages }, dispatch] = useStateValue();
  const { username } = props;

  const lastRowRef: RefObject<any> = React.createRef();
  useEffect(() => {
    lastRowRef.current.scrollIntoView();
  });

  const getUsernameFormat = (messageUsername: string) => {
    const isMyUsername = username === messageUsername;
    const regularUsernameformat = `${messageUsername} says:`;
    const myUsernameFormat = `you said:`;
    return isMyUsername ? myUsernameFormat : regularUsernameformat;
  };

  return (
    <div className={"chatWindowContainer"}>
      <div className={"chatMessages"}>
        {connectedUsers.map((user: User) => {
          const offsetForUser =
            user?.ref?.current?.offsetLeft &&
            `${user.ref.current.offsetLeft + USER_DEFAULT_LEFT_OFFSET}px`;
          return (
            <div
              className={"usersOffsetGrid"}
              style={{ left: offsetForUser }}
              key={user.id}
            ></div>
          );
        })}
        {chatMessages.map((message: ChatMessage, index: number) => {
          const sentMessageUser: User = connectedUsers.find(
            (user: User) => user.name === message.username
          );
          let offsetForUser: any = 0;
          if (sentMessageUser !== undefined) {
            offsetForUser =
              sentMessageUser?.ref?.current?.offsetLeft &&
              `${sentMessageUser.ref.current.offsetLeft}px`;
          }
          return (
            <div key={index} className={"singleChatRow"}>
              <div
                className={"messagePopup"}
                style={{ marginLeft: offsetForUser }}
              >
                <div className={"username"}>
                  {getUsernameFormat(message.username)}
                </div>
                <div className={"message"}>{message.message}</div>
              </div>
            </div>
          );
        })}
        <div className={"singleChatRow"} ref={lastRowRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
