import { useTranslation } from '@localization';
import { ReactNode, Suspense } from 'react';
import { ThemeProvider } from '@web-ui';
import { NetworkProvider } from '@network';

type PreLaunchProps = {
  children?: ReactNode[] | ReactNode;
};

const PreLaunch: React.FC<PreLaunchProps> = ({ children }) => {
  return (
    // TODO: Add a loading screen
    <Suspense fallback={<p>Wait...</p>}>
      <PRE_LAUNCH>{children}</PRE_LAUNCH>
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
        <NetworkProvider value={{baseURL: 'api/'}}>{children}</NetworkProvider>
      </ThemeProvider>
    );
  }
};

export default PreLaunch;
