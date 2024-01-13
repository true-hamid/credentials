import * as React from 'react';
import { AppNavigation } from '@mobile/core';
import PreLaunch from './PreLaunch/PreLaunch';

export default function App() {
  return (
    <PreLaunch>
      <AppNavigation />
    </PreLaunch>
  );
}
