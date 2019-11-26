import * as React from "react";
import "./styles.scss";

interface Props {
  username: string;
}

function ChatWindow(props: Props) {
  return <div className={"chatWindowContainer"}>chat window</div>;
}

export default ChatWindow;
