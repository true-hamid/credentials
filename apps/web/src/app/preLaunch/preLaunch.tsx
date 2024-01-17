import { useTranslation } from '@localization';
import { ReactNode, Suspense } from 'react';
import { ThemeProvider } from '@web-ui';
import { NetworkProvider } from '@network';
import { GlobalStoreProvider } from '@global-store';
import initializei18next from '@localization/init';

type PreLaunchProps = {
  children?: ReactNode[] | ReactNode;
};

initializei18next(
  process.env.NX_LOCALE_DEFAULT_LOCALE || 'en-US',
  process.env.NX_LOCALE_DEBUG === 'true',
  process.env.NX_LOCALE_PROJECT_ID || '',
  process.env.NX_LOCALE_API_KEY || ''
);

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
