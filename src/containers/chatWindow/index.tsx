import * as React from "react";
import "./styles.scss";
import { ChatMessage } from "../chat";
import { RefObject, useEffect, useState } from "react";
import { useStateValue } from "../../state";
import { User } from "../../components/usersList";

interface Props {
  username: string;
}

function ChatWindow(props: Props) {
  const [
    { connectedUsers, isAppReady, chatMessages },
    dispatch
  ] = useStateValue();
  const { username } = props;

  const lastRowRef: RefObject<any> = React.createRef();
  useEffect(() => {
    lastRowRef.current.scrollIntoView();
  });

  useEffect(() => {
    // console.log(connectedUsers);
  }, [connectedUsers]);

  const getUsernameFormat = (messageUsername: string) => {
    const isMyUsername = username === messageUsername;
    const regularUsernameformat = `${messageUsername} says:`;
    const myUsernameFormat = `you said:`;
    return isMyUsername ? myUsernameFormat : regularUsernameformat;
  };

  return (
    <div className={"chatWindowContainer"}>
      {/* <div className={"usersOffsetGrid"}></div> */}
      <div className={"chatMessages"}>
        {connectedUsers.map((user: User) => {
          const offsetForUser =
            user.ref &&
            user.ref.current &&
            user.ref.current.offsetLeft &&
            `${user.ref.current.offsetLeft + 22}px`;
          console.log(
            `chat window - user ${user.name} has offset of ${offsetForUser}`
          );
          return (
            <div
              className={"usersOffsetGrid"}
              style={{ left: offsetForUser }}
            ></div>
          );
        })}
        {chatMessages.map((message: ChatMessage, index: number) => {
          const sentMessageUser: User = connectedUsers.find(
            (user: User) => user.name === message.username
          );
          let reference: any = 0;
          let offsetForUser: any = 0;
          if (sentMessageUser !== undefined) {
            reference =
              sentMessageUser.leftOffset &&
              `${sentMessageUser.leftOffset + 22}px`;

            offsetForUser =
              sentMessageUser.ref &&
              sentMessageUser.ref.current &&
              sentMessageUser.ref.current.offsetLeft &&
              `${sentMessageUser.ref.current.offsetLeft}px`;
            console.log(
              `found message from user ${sentMessageUser.name}, its offset is ${offsetForUser}`
            );
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
