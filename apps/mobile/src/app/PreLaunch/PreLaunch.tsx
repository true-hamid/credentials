import React, { ReactNode, Suspense } from 'react';
import { Text } from 'react-native';
import { useTranslation } from '@localization';
type PreLaunchProps = {
  children?: ReactNode[] | ReactNode;
};

const PreLaunch: React.FC<PreLaunchProps> = ({ children }) => {
  return (
    // TODO: Add a loading screen
    <Suspense fallback={<Text>Wait...</Text>}>
      <PRE_LAUNCH>{children}</PRE_LAUNCH>
    </Suspense>
  );
};

const PRE_LAUNCH: React.FC<PreLaunchProps> = ({ children }) => {
  const { ready: isTranslationReady } = useTranslation();

  if (!isTranslationReady) {
    return null;
  } else {
    return children;
  }
};

export default PreLaunch;
