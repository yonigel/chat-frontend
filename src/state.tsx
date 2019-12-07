import * as React from "react";
import { createContext, useContext, useReducer } from "react";
export const StateContext = createContext<any>({});
interface Props {
  reducer: any;
  initialState: any;
  children: any;
}
export const StateProvider = (props: Props) => {
  const { reducer, initialState, children } = props;
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
