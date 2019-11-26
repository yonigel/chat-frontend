import * as React from "react";
import { Button, Input } from "reactstrap";
import "./styles.scss";

interface Props {
  onUserLogin: (username: string) => void;
}

function Login(props: Props) {
  const [username, setUsername] = React.useState("");
  const { onUserLogin } = props;
  const onUsernameInputChange = (e: any) => {
    const username = e.target.value;
    setUsername(username);
  };
  return (
    <div className={"loginContainer"}>
      <div className={"loginTitle"}>Hi, what is your name?</div>
      <div className={"loginInput"}>
        <Input
          type="text"
          onChange={onUsernameInputChange}
          placeholder="Please enter username"
        />
      </div>
      <div className={"loginSubmit"}>
        <Button color="info" onClick={() => onUserLogin(username)}>
          Let me in!
        </Button>
      </div>
    </div>
  );
}

export default Login;
