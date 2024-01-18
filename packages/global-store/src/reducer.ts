import { USER_COUNTRY } from '@types';
import * as Constants from './constants';

export const initialState = {
  apiError: {
    errorCode: null,
  },
  session: {
    authToken: null,
    country: null,
  },
};

export type GlobalStateApiError = {
  errorCode?: string | null;
};

export type GlobalStateSession = {
  authToken?: string | null;
  country?: USER_COUNTRY | null;
};

export type GlobalStateTypes = {
  apiError?: GlobalStateApiError;
  session?: GlobalStateSession;
};

export type ActionTypes = {
  type: string;
  payload: GlobalStateApiError | GlobalStateSession | null;
};

export default (
  state: GlobalStateTypes = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case Constants.SET_SESSION:
      return {
        ...state,
        session: action.payload,
      };
    case Constants.CLEAR_SESSION:
      return {
        ...state,
        session: initialState.session,
      };
    case Constants.SET_API_ERROR:
      return {
        ...state,
        apiError: action.payload,
      };
    case Constants.CLEAR_API_ERROR:
      return {
        ...state,
        apiError: initialState.apiError,
      };
    default:
      return state;
  }
};
