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
  pushNotificationId?: string;
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
    loading: signUpLoading,
    error: signUpError,
    data: signUpData,
  } = useAPIRequest<{ token: string }>({
    url: Endpoints.SIGN_UP,
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

  const signUp = async (publicKey: string) => {
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
      pushNotificationId: formValues.pushNotificationId,
    };

    request({
      data,
    });
  };

  useEffect(() => {
    if (authData?.pbk) {
      signUp(authData?.pbk);
    }
  }, [authData?.pbk]);

  const requestSignUp = (params: FormValues) => {
    setFormValues(params);
    requestAuthData();
  };

  return {
    requestSignUp,
    loading: delayedAuthLoading || signUpLoading,
    error: signUpError || authError,
    data: signUpData,
  };
};
