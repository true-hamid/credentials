import React, { ReactNode, Suspense, useCallback } from 'react';
import { useTranslation } from '@localization';
import { Loader, ThemeProvider } from '@native-ui';
import { useGlobalStore } from '@global-store';
import { NetworkProvider } from '@network';
import { config } from '../../core/config';
import { isIOS } from '@utils/native';
import APIErrorHandler from '../components/APIErrorHandler';
import { AppStorage } from '../../core/storage';
import { StorageKeys } from '@utils';
import { USER_COUNTRY } from '@types';
import { I18nManager } from 'react-native';

type PreLaunchProps = {
  children?: ReactNode[] | ReactNode;
};

const PreLaunch: React.FC<PreLaunchProps> = ({ children }) => {
  const { session } = useGlobalStore();
  const getUserCountryFromStorage = useCallback(
    () => AppStorage.getString(StorageKeys.USER_COUNTRY) as USER_COUNTRY,
    []
  );

  const getCountry = () => {
    let country = undefined;
    const userCountryFromStorage = getUserCountryFromStorage();

    if (session.country) {
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
console.log('I18nManager.isRTL', I18nManager.isRTL)
  if (!isTranslationReady) {
    return null;
  } else {
    return (
      <NetworkProvider
        value={{
          baseURL: isIOS ? config.IOS_BASE_URL : config.ANDROID_BASE_URL,
          channel: config.CHANNEL_NAME,
        }}
      >
        <APIErrorHandler />
        {children}
      </NetworkProvider>
    );
  }
};

export default PreLaunch;
