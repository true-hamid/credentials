import { SET_AUTH_TOKEN, CLEAR_AUTH_TOKEN } from './constants';

export const setAuthToken = (authToken: string) => ({
  type: SET_AUTH_TOKEN,
  payload: authToken,
});

export const clearAuthToken = () => ({
  type: CLEAR_AUTH_TOKEN,
});
