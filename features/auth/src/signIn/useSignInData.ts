import { useGlobalStore } from '@global-store';
import { USER_COUNTRY } from '@types';

export const useSignInData = () => {
  // TODO: add any required state mutations here
  const { setSession } = useGlobalStore();

  return {
    setDataOnSignIn: (data: { authToken: string, country: USER_COUNTRY }) => {
      setSession(data);
    },
  };
};
