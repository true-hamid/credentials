import { ReactNode } from 'react';

export interface ThemeProviderProps {
  children: ReactNode;
  value?: ThemeParams;
}

export interface ThemeParams {
  userCountry?: USER_COUNTRY | undefined;
}

export enum LANGUAGE {
  enUS = 'en-US',
  arSD = 'ar-SD',
  arAE = 'ar-AE',
}

export enum USER_COUNTRY {
  AE = 'AE',
  SD = 'SD',
  IN = 'IN',
}

export enum SignInFormFields {
  USERNAME = 'username',
  PASSWORD = 'password',
}

export enum SignUpFormFields {
  USERNAME = 'signUpUsername',
  PASSWORD = 'signUpPassword',
  NAME = 'name',
  COUNTRY = 'country',
  PHONE_NUMBER = 'phoneNumber',
}

export enum PasswordFormFields {
  COUNTRY = 'country',
  NAME = 'name',
  USERNAME = 'username',
  PHONE_NUMBER = 'phoneNumber',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export type Size = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface NetworkContextType {
  baseURL: string;
  channel?: string;
}

export type NetworkProviderProps = {
  children: React.ReactNode;
  value: NetworkContextType;
};

export enum SemanticVariant {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export type SignInApiResponse = { authToken: string; country: USER_COUNTRY };
