import { User } from "../components/usersList";
import { ChatMessage } from "../containers/chat";

import { usersReducer } from "./usersReducer";
import { messageReducer } from "./chatMessagesReducer";

export interface MainState {
  connectedUsers: User[];
  chatMessages: ChatMessage[];
}

export const mainReducer = (
  { connectedUsers, chatMessages }: MainState,
  action: any
) => {
  return {
    connectedUsers: usersReducer(connectedUsers, action),
    chatMessages: messageReducer(chatMessages, action)
  };
};
