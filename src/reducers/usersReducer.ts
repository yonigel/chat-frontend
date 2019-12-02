import { UsersActionTypes } from "../actions";
import { User } from "../components/usersList";

export const usersReducer = (usersList: User[], action: any) => {
  switch (action.type) {
    case UsersActionTypes.Add:
      if (action.payload === undefined) {
        return [...usersList];
      }
      return [...usersList, action.payload];
    case UsersActionTypes.Remove:
      if (action.payload === undefined) {
        return [...usersList];
      }
      const newUsersList = usersList.filter(
        (user: User) => user.id !== action.payload.id
      );
      return [...newUsersList];
    default:
      return [...usersList];
  }
};
