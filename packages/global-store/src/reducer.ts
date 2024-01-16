import * as Constants from './constants';

export const initialState = {
  authToken: null,
};

export type GlobalStateTypes = {
  authToken: string | null;
};

export type ActionTypes = {
  type: string;
  payload: string | null;
};

export default (state: GlobalStateTypes = initialState, action: ActionTypes) => {
  switch (action.type) {
    case Constants.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case Constants.CLEAR_AUTH_TOKEN:
      return {
        ...state,
        authToken: initialState.authToken,
      };
    default:
      return state;
  }
};
