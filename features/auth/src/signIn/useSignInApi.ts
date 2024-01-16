import { useEffect, useState } from 'react';
import { Endpoints, useAPIRequest } from '@network';
import { API_METHODS } from '@types';

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
  const [loading, setLoading] = useState(false);

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
  } = useAPIRequest<{ token: string }>({
    url: Endpoints.SIGN_IN,
    method: API_METHODS.POST,
  });

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

  useEffect(() => {
    if ((loading && signInError) || authError || signInData) {
      setLoading(false);
    } else if ((!loading && signInLoading) || authLoading) {
      setLoading(true);
    }
  }, [authLoading, signInLoading, loading, signInError, authError, signInData]);

  const requestSignIn = (params: { username: string; password: string }) => {
    setFormValues(params);
    requestAuthData();
  };

  return {
    requestSignIn,
    loading,
    error: signInError || authError,
    data: signInData,
  };
};
