import { useEffect, useState } from 'react';
import JSEncrypt from 'jsencrypt';
import { useAPIRequest } from '@network';
import { useGlobalStore } from '@global-store';
import { API_METHODS } from '@types';

type AuthResponse = { pbk: ''; randomId: '' };
type FormValues = { username: string; password: string };

export const useSignInApi = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    password: '',
  });
  const {
    request: requestAuthData,
    loading: authLoading,
    error: authError,
    data: authData,
  } = useAPIRequest<AuthResponse>({ url: 'auth', method: API_METHODS.GET });
  const {
    request,
    loading: signInLoading,
    error: signInError,
    data: signInData,
  } = useAPIRequest<{ token: string }>({
    url: '/auth/signIn',
    method: API_METHODS.POST,
  });
  const { setAuthToken } = useGlobalStore();

  useEffect(() => {
    if (authData?.pbk) {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(authData?.pbk || '');
      const encryptedUsername = encrypt.encrypt(formValues.username);
      const encryptedPassword = encrypt.encrypt(formValues.password);

      request({
        data: {
          username: encryptedUsername,
          password: encryptedPassword,
          // payload: encryptedPayload,
          randomId: authData?.randomId,
          publicKey: authData?.pbk,
        },
      });
    }
  }, [authData?.pbk, authData?.randomId]);

  useEffect(() => {
    if (signInData?.token) {
      setAuthToken(signInData?.token);
    }
  }, [signInData?.token]);

  const requestSignIn = (params: { username: string; password: string }) => {
    setFormValues(params);
    requestAuthData();
  };

  return {
    requestSignIn,
    loading: signInLoading || authLoading,
    error: signInError || authError,
    data: signInData,
  };
};
