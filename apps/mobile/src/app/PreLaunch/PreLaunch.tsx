import React, { ReactNode, Suspense, useCallback } from 'react';
import { Text } from 'react-native';
import { useTranslation } from '@localization';
import { ThemeProvider } from '@native-ui';
import initializei18next from '@localization/init';
import { GlobalStoreProvider } from '@global-store';
import { NetworkProvider } from '@network';
import { config } from '../../core/config';
import { isIOS } from '@utils/native';
import APIErrorHandler from '../components/APIErrorHandler';
import { Storage } from '../../core/storage';
import { StorageKeys } from '@utils';
import { USER_COUNTRY } from '@types';

type PreLaunchProps = {
  children?: ReactNode[] | ReactNode;
};

// TODO-CONFIG: get these values from environment variables
initializei18next(
  config.DEFAULT_APP_LANGUAGE,
  config.LOCALE_DEBUG === 'true',
  config.LOCALE_PROJECT_ID,
  config.LOCALE_API_KEY
);

const PreLaunch: React.FC<PreLaunchProps> = ({ children }) => {
  return (
    // TODO: Add a loading screen
    <Suspense fallback={<Text>Wait...</Text>}>
      <GlobalStoreProvider>
        <PRE_LAUNCH>{children}</PRE_LAUNCH>
      </GlobalStoreProvider>
    </Suspense>
  );
};

const PRE_LAUNCH: React.FC<PreLaunchProps> = ({ children }) => {
  const { ready: isTranslationReady } = useTranslation();
  const userCountry = Storage.getString(StorageKeys.USER_COUNTRY) as USER_COUNTRY;

  if (!isTranslationReady) {
    return null;
  } else {
    // TODO: set theme later
    return (
      <ThemeProvider value={{userCountry}}>
        <NetworkProvider
          value={{
            baseURL: isIOS ? config.IOS_BASE_URL : config.ANDROID_BASE_URL,
          }}
        >
          <APIErrorHandler />
          {children}
        </NetworkProvider>
      </ThemeProvider>
    );
  }
};

export default PreLaunch;
