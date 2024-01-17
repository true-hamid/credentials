import { useEffect, useState } from 'react';
import { Endpoints, useAPIRequest } from '@network';
import { API_METHODS } from '@types';

type AuthResponse = { pbk: ''; randomId: '' };
type FormValues = {
  username: string;
  password: string;
  country: string;
  name: string;
  phoneNumber: string;
};
type SignUpApiParams = (
  value: string,
  key: string
) => Promise<string> | string | false;

export const useSignUpApi = (encryptionFunction: SignUpApiParams) => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    password: '',
    country: '',
    name: '',
    phoneNumber: '',
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
    loading: signUpLoading,
    error: signUpError,
    data: signUpData,
  } = useAPIRequest<{ token: string }>({
    url: Endpoints.SIGN_UP,
    method: API_METHODS.POST,
  });

  const signUp = async (publicKey: string) => {
    console.log('publicKey', publicKey);
    console.log('formValues', formValues);
    const encryptedUsername = await encryptionFunction(
      formValues.username,
      publicKey
    );
    const encryptedPassword = await encryptionFunction(
      formValues.password,
      publicKey
    );
    const data = {
      username: encryptedUsername,
      password: encryptedPassword,
      country: formValues.country,
      name: formValues.name,
      phoneNumber: formValues.phoneNumber,
      randomId: authData?.randomId,
      publicKey: authData?.pbk,
    };
    console.log('data', data);
    request({
      data,
    });
  };

  useEffect(() => {
    if (authData?.pbk) {
      signUp(authData?.pbk);
    }
  }, [authData?.pbk]);

  useEffect(() => {
    if ((loading && signUpError) || authError || signUpData) {
      setLoading(false);
    } else if ((!loading && signUpLoading) || authLoading) {
      setLoading(true);
    }
  }, [authLoading, signUpLoading, loading, signUpError, authError, signUpData]);

  const requestSignUp = (params: FormValues) => {
    console.log('params', params);
    setFormValues(params);
    requestAuthData();
  };

  return {
    requestSignUp,
    loading,
    error: signUpError || authError,
    data: signUpData,
  };
};
