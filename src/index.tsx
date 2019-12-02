import * as React from "react";
import * as ReactDOM from "react-dom";
import Chat from "./containers/chat";
import { StateProvider } from "./state";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

const initialState = {
  theme: { primary: "green" }
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "changeTheme":
      return {
        ...state,
        theme: action.newTheme
      };

    default:
      return state;
  }
};

var mountNode = document.getElementById("app");
ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <Chat />
  </StateProvider>,
  mountNode
);
