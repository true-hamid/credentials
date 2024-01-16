import { useContext } from 'react';
import * as Actions from './actions';
import { GlobalDispatchContext, GlobalStateContext } from './context';

export const useGlobalStore = () => {
    const { authToken } = useContext(GlobalStateContext);
    const dispatch = useContext(GlobalDispatchContext);

    return {
        authToken,
        setAuthToken: (authToken: string) => {dispatch(Actions.setAuthToken(authToken))},
        clearAuthToken: () => {dispatch(Actions.clearAuthToken())},
    }
};
