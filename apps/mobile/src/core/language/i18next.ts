import { I18nManager } from 'react-native';
import Backend from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';
import { i18n } from '@localization';
import { StorageKeys } from '@utils';
import { config } from '../config';
import { AppStorage } from '../storage';
import { LANGUAGE } from '@types';

const language =
  AppStorage.getString(StorageKeys.APP_LANG) || config.DEFAULT_APP_LANGUAGE;
if (language) {
  i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      fallbackLng: false,
      compatibilityJSON: 'v3',
      lng: language,
      supportedLngs: ['en-US', 'ar-SD', 'ar-AE'],
      saveMissing: true,
      backend: {
        projectId: config.LOCALE_PROJECT_ID,
        apiKey: config.LOCALE_API_KEY,
        referenceLng: language,
      },
    });
}
