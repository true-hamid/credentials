import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-locize-backend';

const initializei18next = (
  defaultLanguage: string,
  debug: boolean,
  projectId: string,
  apiKey: string
) => {
  i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      lng: defaultLanguage,
      debug,
      backend: {
        projectId,
        apiKey,
        referenceLng: defaultLanguage,
      },
    });
};
export default initializei18next;
