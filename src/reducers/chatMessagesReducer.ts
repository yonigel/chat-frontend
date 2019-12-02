import { ChatMessage } from "../containers/chat";
import { MessageActionTypes } from "../actions";

export const messageReducer = (
  messagesList: ChatMessage[],
  messageAction: any
) => {
  switch (messageAction.type) {
    case MessageActionTypes.Add:
      if (
        messageAction.payload === undefined ||
        messageAction.payload.message === ""
      ) {
        return [...messagesList];
      }
      return [...messagesList, messageAction.payload];
    default:
      return [...messagesList];
  }
};
