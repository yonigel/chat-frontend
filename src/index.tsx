import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.scss";
import Chat from "./containers/chat";

var mountNode = document.getElementById("app");
ReactDOM.render(<Chat />, mountNode);
