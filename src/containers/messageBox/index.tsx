import * as React from "react";
import { useState } from "react";
import "./styles.scss";
import { Input, Button } from "reactstrap";

interface Props {
  onMessageSend: (message: string) => void;
}

function MessageBox(props: Props) {
  const [messageText, setMessageText] = useState("");

  const { onMessageSend } = props;

  const onSendButtonClick = () => {
    onMessageSend(messageText);
    setMessageText("");
  };

  const onTextInputChange = (e: any) => {
    const text = e.target.value;
    setMessageText(text);
  };

  return (
    <div className={"messageBoxContainer"}>
      <div className={"textInputContainer"}>
        <Input
          type="text"
          placeholder={"I am waiting..."}
          onChange={onTextInputChange}
          value={messageText}
        />
      </div>
      <div className={"messageSendButtonContainer"}>
        <Button onClick={onSendButtonClick}>Send!</Button>
      </div>
    </div>
  );
}

export default MessageBox;
