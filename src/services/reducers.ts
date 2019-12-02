import { MessageActionTypes, UsersActionTypes } from "../consts/actionTypes";
import { ChatMessage } from "../containers/chat";
import { User } from "../components/usersList";

interface MessageAction {
  type: MessageActionTypes;
  payload: ChatMessage;
}

interface UserAction {
  type: UsersActionTypes;
  payload: User;
}

export const messageReducer = (
  messagesList: ChatMessage[],
  messageAction: MessageAction
) => {
  switch (messageAction.type) {
    case MessageActionTypes.Add:
      if (
        messageAction.payload === undefined ||
        messageAction.payload.message === ""
      ) {
        console.log("empty");
        return [...messagesList];
      }
      return [...messagesList, messageAction.payload];
    default:
      return [...messagesList];
  }
};

export const usersReducer = (usersList: User[], userAction: UserAction) => {
  switch (userAction.type) {
    case UsersActionTypes.Add:
      if (userAction.payload === undefined) {
        return [...usersList];
      }
      return [...usersList, userAction.payload];
    default:
      return [...usersList];
  }
};
