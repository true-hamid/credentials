import { useEffect, useState } from 'react';
import { Endpoints, useAPIRequest } from '@network';
import { API_METHODS, SignInApiResponse } from '@types';

type AuthResponse = { pbk: ''; randomId: '' };
type FormValues = { username: string; password: string };
type SignInApiParams = (
  value: string,
  key: string
) => Promise<string> | string | false;

export const useSignInApi = (encryptionFunction: SignInApiParams) => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    password: '',
  });
  const [delayedAuthLoading, setDelayedAuthLoading] = useState(false);

  const {
    request: requestAuthData,
    loading: authLoading,
    error: authError,
    data: authData,
  } = useAPIRequest<AuthResponse>({
    url: Endpoints.AUTH_PARAMS,
    method: API_METHODS.GET,
  });

  const {
    request,
    loading: signInLoading,
    error: signInError,
    data: signInData,
  } = useAPIRequest<SignInApiResponse>({
    url: Endpoints.SIGN_IN,
    method: API_METHODS.POST,
  });

  useEffect(() => {
    if (authLoading) {
      setDelayedAuthLoading(true);
    } else {
      // Delay setting delayedAuthLoading to false by 500ms
      const timeoutId = setTimeout(() => {
        setDelayedAuthLoading(false);
      }, 500);

      // Clear timeout on unmount
      return () => clearTimeout(timeoutId);
    }
  }, [authLoading]);

  const signIn = async (publicKey: string) => {
    const encryptedUsername = await encryptionFunction(
      formValues.username,
      publicKey
    );
    const encryptedPassword = await encryptionFunction(
      formValues.password,
      publicKey
    );

    request({
      data: {
        username: encryptedUsername,
        password: encryptedPassword,
        randomId: authData?.randomId,
        publicKey: authData?.pbk,
      },
    });
  };

  useEffect(() => {
    if (authData?.pbk) {
      signIn(authData?.pbk);
    }
  }, [authData?.pbk]);

  const requestSignIn = (params: { username: string; password: string }) => {
    setFormValues(params);
    requestAuthData();
  };

  return {
    requestSignIn,
    loading: delayedAuthLoading || signInLoading,
    error: signInError || authError,
    data: signInData,
  };
};
