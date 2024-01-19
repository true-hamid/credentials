import { USER_COUNTRY } from '@types';
import * as Constants from './constants';

export const initialState = {
  apiError: {
    errorCode: null,
    statusCode: null,
  },
  session: {
    authToken: null,
    country: null,
  },
};

export type GlobalStateApiError = {
  errorCode?: string | null;
  statusCode?: number | null;
};

export type GlobalStateSession = {
  authToken?: string | null;
  country?: USER_COUNTRY | null;
};

export type ActionPayloadTypes = GlobalStateApiError & GlobalStateSession;
// & null;

export type GlobalStateTypes = {
  apiError?: GlobalStateApiError;
  session?: GlobalStateSession;
};

export type ActionTypes = {
  type: string;
  payload: ActionPayloadTypes;
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
        apiError: {
          errorCode: action.payload?.errorCode,
          statusCode: action.payload?.statusCode,
        },
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
