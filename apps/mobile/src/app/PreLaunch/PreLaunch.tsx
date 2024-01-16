import React, { ReactNode, Suspense } from 'react';
import { Text } from 'react-native';
import { useTranslation } from '@localization';
import { ThemeProvider } from '@native-ui';
import initializei18next from '@localization/init';
import { GlobalStoreProvider } from '@global-store';
import { NetworkProvider } from '@network';

type PreLaunchProps = {
  children?: ReactNode[] | ReactNode;
};

// TODO-CONFIG: get these values from environment variables
initializei18next(
  'en-US',
  true,
  '66930075-9b8e-42ae-b50a-3ceee4997710',
  'fba250fe-958d-46c3-b0a1-081542de5cf8'
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

  if (!isTranslationReady) {
    return null;
  } else {
    // TODO: set theme later
    return (
      <ThemeProvider>
        <NetworkProvider value={{ baseURL: 'http://10.0.2.2:3000/api/' }}>
          {children}
        </NetworkProvider>
      </ThemeProvider>
    );
  }
};

export default PreLaunch;
