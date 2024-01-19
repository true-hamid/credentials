import PreLaunch from './preLaunch/preLaunch';
import { GlobalStoreProvider } from '@global-store';
import {AppRouter} from '../core/router';
import '../core/language/i18next';

export function App() {

  return (
    <GlobalStoreProvider>
      <PreLaunch>
        <AppRouter />
      </PreLaunch>
    </GlobalStoreProvider>
  );
}

export default App;
