import { User } from "../components/usersList";
import { ChatMessage } from "../containers/chat";

import { usersReducer } from "./usersReducer";
import { messageReducer } from "./chatMessagesReducer";

export interface MainState {
  connectedUsers: User[];
  chatMessages: ChatMessage[];
}

export const mainReducer = (initialState: MainState, action: any) => {
  return {
    connectedUsers: usersReducer(initialState.connectedUsers, action),
    chatMessages: messageReducer(initialState.chatMessages, action)
  };
};
