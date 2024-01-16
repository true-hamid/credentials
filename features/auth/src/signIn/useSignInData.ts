import { useGlobalStore } from '@global-store';

export const useSignInData = () => {
  // TODO: add any required state mutations here
  const { setAuthToken } = useGlobalStore();

  return {
    setDataOnSignIn: (data: { token: string }) => {
      setAuthToken(data.token);
    },
  };
};
