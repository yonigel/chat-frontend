import { AppActionsTypes } from "../actions";

export const appReducer = (isAppReadyState: boolean, action: any) => {
  switch (action.type) {
    case AppActionsTypes.SET_APP_STATE:
      if (action.payload === undefined) {
        return isAppReadyState;
      }
      return action.payload;
    default:
      return isAppReadyState;
  }
};
