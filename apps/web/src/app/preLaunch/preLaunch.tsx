import React, { ReactNode, Suspense, useCallback } from 'react';
import { useTranslation } from '@localization';
import { Loader, ThemeProvider } from '@web-ui';
import { useGlobalStore } from '@global-store';
import { NetworkProvider } from '@network';
import APIErrorHandler from '../components/APIErrorHandler';
import { StorageKeys } from '@utils';
import { USER_COUNTRY } from '@types';

type PreLaunchProps = {
  children?: ReactNode[] | ReactNode;
};

const PreLaunch: React.FC<PreLaunchProps> = ({ children }) => {
  const { session } = useGlobalStore();
  const getUserCountryFromStorage = useCallback(
    () => localStorage.getItem(StorageKeys.USER_COUNTRY) as USER_COUNTRY,
    []
  );

  const getCountry = () => {
    let country = undefined;
    const userCountryFromStorage = getUserCountryFromStorage();

    if (session?.country) {
      country = { userCountry: session.country };
    } else if (userCountryFromStorage) {
      country = { userCountry: userCountryFromStorage };
    }
    return country;
  };

  return (
    <ThemeProvider value={getCountry()}>
      <Suspense fallback={<Loader visible />}>
        <PRE_LAUNCH>{children}</PRE_LAUNCH>
      </Suspense>
    </ThemeProvider>
  );
};

const PRE_LAUNCH: React.FC<PreLaunchProps> = ({ children }) => {
  const { ready: isTranslationReady } = useTranslation();

  if (!isTranslationReady) {
    return null;
  } else {
    return (
      <NetworkProvider value={{ baseURL: process.env.NX_BASE_URL || '' }}>
        <APIErrorHandler />
        {children}
      </NetworkProvider>
    );
  }
};

export default PreLaunch;
