import {
  SET_SESSION,
  CLEAR_SESSION,
  SET_API_ERROR,
  CLEAR_API_ERROR,
} from './constants';
import { GlobalStateApiError, GlobalStateSession } from './reducer';

export const setSession = (session: GlobalStateSession) => ({
  type: SET_SESSION,
  payload: session,
});

export const clearSession = () => ({
  type: CLEAR_SESSION,
});

export const setAPIError = (error: GlobalStateApiError) => ({
  type: SET_API_ERROR,
  payload: error,
});

export const clearAPIError = () => ({
  type: CLEAR_API_ERROR,
});
