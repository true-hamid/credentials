import { AppRegistry } from 'react-native';
import App from './app/App';
import initializei18next from '@localization/init';

// TODO-CONFIG: get these values from environment variables
initializei18next(
  'en-US',  
  true,
  '66930075-9b8e-42ae-b50a-3ceee4997710',
  'fba250fe-958d-46c3-b0a1-081542de5cf8',
);

AppRegistry.registerComponent('AppsMobile', () => App);
