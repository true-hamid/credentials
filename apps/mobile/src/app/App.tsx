import * as React from 'react';
import { AppNavigation } from '@mobile/core';
import { GlobalStoreProvider } from '@global-store';
import PreLaunch from './PreLaunch/PreLaunch';
import '../core/language/i18next';

export default function App() {
  return (
    <GlobalStoreProvider>
      <PreLaunch>
        <AppNavigation />
      </PreLaunch>
    </GlobalStoreProvider>
  );
}
