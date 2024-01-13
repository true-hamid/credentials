import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import initializei18next from '@localization/init';


import App from './app/app';

initializei18next(
  process.env.NX_LOCALE_DEFAULT_LOCALE || 'en-US', 
  process.env.NX_LOCALE_DEBUG === 'true',
  process.env.NX_LOCALE_PROJECT_ID || '',
  process.env.NX_LOCALE_API_KEY || '',
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
