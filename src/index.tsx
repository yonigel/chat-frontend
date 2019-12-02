import * as React from "react";
import * as ReactDOM from "react-dom";
import Chat from "./containers/chat";
import { StateProvider } from "./state";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import { mainReducer, MainState } from "./reducers";

const initialState: MainState = {
  connectedUsers: [],
  chatMessages: []
};

var mountNode = document.getElementById("app");
ReactDOM.render(
  <StateProvider initialState={initialState} reducer={mainReducer}>
    <Chat />
  </StateProvider>,
  mountNode
);
