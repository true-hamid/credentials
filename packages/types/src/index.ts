import { ReactNode } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { getTheme } from '@theme/src/core/helpers';

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

// export enum NetworkInstanceType {
//   Basic = 'Basic',
//   Auth = 'Auth',
// }
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

export type MenuProps = {
  clickableLabel: string;
  data: { label: string; value: string }[];
  onItemSelect: (value: string) => void;
  anchorStyle?: StyleProp<ViewStyle>;
  selectedItem?: string;
  anchor?: ReactNode;
  menuVisible?: boolean;
  onCloseMenu?: () => void;
};

export enum SemanticVariant {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'INFO',
}

export type SignInApiResponse = { authToken: string; country: USER_COUNTRY };

export type ThemeObject = typeof getTheme;