import { useGlobalStore } from '@global-store';
import { SignInApiResponse, USER_COUNTRY } from '@types';
import { StorageKeys } from '@utils';

export const useSignInData = (
  saveToStorage: (key: string, country: USER_COUNTRY) => void
) => {
  // TODO: add any required state mutations here
  const { setSession } = useGlobalStore();
  const onSignIn = (data: SignInApiResponse) => {
    saveToStorage(StorageKeys.USER_COUNTRY, data.country);
    setSession(data);
  };
  return {
    setDataOnSignIn: onSignIn,
  };
};
