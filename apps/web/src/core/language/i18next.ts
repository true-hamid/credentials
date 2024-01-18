import Backend from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';
import { i18n } from '@localization';
import { StorageKeys } from '@utils';
import { LANGUAGE } from '@types';

const language =
  localStorage.getItem(StorageKeys.APP_LANG) ||
  process.env.NX_LOCALE_DEFAULT_LOCALE;
console.log('language', language);
if (language) {
  if (language === LANGUAGE.arAE || language === LANGUAGE.arSD) {
    document.body.setAttribute('dir', 'rtl');
  } else {
    document.body.setAttribute('dir', 'ltr');
  }
  i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      fallbackLng: false,
      compatibilityJSON: 'v3',
      lng: language,
      supportedLngs: [LANGUAGE.enUS, LANGUAGE.arSD, LANGUAGE.arAE],
      saveMissing: true,
      backend: {
        projectId: process.env.NX_LOCALE_PROJECT_ID,
        apiKey: process.env.NX_LOCALE_API_KEY,
        referenceLng: language,
      },
    });
}
