import { ReactNode } from 'react';
import { ViewProps } from 'react-native';

export interface ThemeProviderProps {
  children: ReactNode;
  value?: ThemeParams;
}

export interface ThemeParams {
  userCountry?: USER_COUNTRY;
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

export enum LoginFormFields {
  USERNAME = 'username',
  PASSWORD = 'password',
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

export type SpacerProps = ViewProps & {
  /**
   * `size` for the spacer
   */
  size: Size;

  /**
   * `vertical` default type, sets the vertical spacing
   */
  vertical?: boolean;
};
