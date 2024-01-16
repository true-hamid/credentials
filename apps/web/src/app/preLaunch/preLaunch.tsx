import { useTranslation } from '@localization';
import { ReactNode, Suspense } from 'react';
import { ThemeProvider } from '@web-ui';
import { NetworkProvider } from '@network';
import { GlobalStoreProvider } from '@global-store';

type PreLaunchProps = {
  children?: ReactNode[] | ReactNode;
};

const PreLaunch: React.FC<PreLaunchProps> = ({ children }) => {
  return (
    // TODO: Add a loading screen
    <Suspense fallback={<p>Wait...</p>}>
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
    return (
      <ThemeProvider>
        <NetworkProvider value={{ baseURL: 'api/' }}>
          {children}
        </NetworkProvider>
      </ThemeProvider>
    );
  }
};

export default PreLaunch;
