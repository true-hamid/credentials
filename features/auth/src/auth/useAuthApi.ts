import { useAPIRequest } from '@network';
import { API_METHODS } from '@types';

type AuthResponse = { pbk: ''; randomId: '' };
export const useAuthApi = () => {
  const {
    request: requestAuthData,
    loading: authLoading,
    error: authError,
    data: authData,
  } = useAPIRequest<AuthResponse>({ url: 'auth', method: API_METHODS.GET });

  return {
    requestAuthData,
    authLoading,
    authError,
    authData,
  };
};
