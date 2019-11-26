import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles.scss";
import Chat from "./containers/chat";

var mountNode = document.getElementById("app");
ReactDOM.render(<Chat />, mountNode);
