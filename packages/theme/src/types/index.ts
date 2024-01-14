import { ReactNode } from 'react';

export interface ProviderProps {
  children: ReactNode;
  value: ThemeParams;
}

export interface ThemeParams {
  userCountry: USER_COUNTRY;
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
