import { MessageActionTypes } from "../consts/messages";
import { ChatMessage } from "../containers/chat";

export const messageReducer = (
  messagesList: ChatMessage[],
  messageAction: any
) => {
  switch (messageAction.type) {
    case MessageActionTypes.Add:
      return [...messagesList, messageAction.payload];
    default:
      return [...messagesList];
  }
};
