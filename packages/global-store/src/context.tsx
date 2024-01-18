import React, { Dispatch, ReactNode, useReducer } from 'react';
import Reducer, { initialState, GlobalStateTypes, ActionTypes } from './reducer';

export const GlobalStateContext =
  React.createContext<GlobalStateTypes>(initialState);
export const GlobalDispatchContext = React.createContext(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (() => {}) as Dispatch<any>
);

export default (props: { children: ReactNode }) => {
  const { children } = props;
  const [state, dispatch] = useReducer(
    Reducer as (state: GlobalStateTypes, action: ActionTypes) => GlobalStateTypes,
    initialState
  );
  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};
