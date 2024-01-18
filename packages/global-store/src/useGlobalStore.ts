import { useContext } from 'react';
import * as Actions from './actions';
import { GlobalDispatchContext, GlobalStateContext } from './context';
import { GlobalStateApiError, GlobalStateSession } from './reducer';

export const useGlobalStore = () => {
  const { session, apiError } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  return {
    session,
    setSession: (session: GlobalStateSession) => {
      dispatch(Actions.setSession(session));
    },
    clearSession: () => {
      dispatch(Actions.clearSession());
    },
    apiError,
    setApiError: (apiError: GlobalStateApiError) => {
      dispatch(Actions.setAPIError(apiError));
    },
    clearApiError: () => {
      dispatch(Actions.clearAPIError());
    },
  };
};
