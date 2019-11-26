import * as React from "react";
import "./styles.scss";

interface Props {
  onUserLogin: (username: string) => void;
}

function Login(props: Props) {
  return <div className={"loginContainer"}>login</div>;
}

export default Login;
