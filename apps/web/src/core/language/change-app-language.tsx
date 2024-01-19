import React from 'react';
import { i18n } from '@localization';
import { Menu } from '@web-ui';
import { StorageKeys } from '@utils';
import TranslateIcon from '@mui/icons-material/Translate';
import { LANGUAGE } from '@types';

export const ChangeAppLanguage: React.FC = () => {
  const appLanguages = [
    {
      label: i18n.t('english_US'),
      value: LANGUAGE.enUS,
    },
    { label: i18n.t('arabic_SD'), value: LANGUAGE.arSD },
    { label: i18n.t('arabic_AE'), value: LANGUAGE.arAE },
  ];

  const onLanguageSelect = (language: string) => {
    localStorage.setItem(StorageKeys.APP_LANG, language);
    i18n.changeLanguage(language);
    document.body.setAttribute("dir", LANGUAGE.enUS === language ? "ltr" : "rtl");
  };

  return (
    <Menu
      data={appLanguages}
      onItemSelect={onLanguageSelect}
      iconAnchor={<TranslateIcon style={{color: '#fff'}} />}
    />
  );
};
