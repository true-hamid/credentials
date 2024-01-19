import { TFunction } from 'i18next';
import * as yup from 'yup';
import { SignInFormFields, SignUpFormFields, USER_COUNTRY } from '@types';

import { RegularExperessions } from './regex';
import { getValidationSchemaFunc } from './utils';

type GetFormValidationsParams = {
  country?: USER_COUNTRY;
  t: TFunction | ((p: string) => string);
};

const countrySpecificRegexsMap = {
  [SignUpFormFields.USERNAME]: {
    [USER_COUNTRY.AE]: RegularExperessions.AE_USERNAME,
    [USER_COUNTRY.IN]: RegularExperessions.IN_USERNAME,
    [USER_COUNTRY.SD]: RegularExperessions.SD_USERNAME,
    DEFAULT: RegularExperessions.ALPHANUMERIC_AND_SPECIAL_CHARS,
  },
  [SignUpFormFields.PHONE_NUMBER]: {
    [USER_COUNTRY.AE]: RegularExperessions.AE_PHONE_NUMBER,
    [USER_COUNTRY.IN]: RegularExperessions.IN_PHONE_NUMBER,
    [USER_COUNTRY.SD]: RegularExperessions.SD_PHONE_NUMBER,
    DEFAULT: RegularExperessions.NUMBERS_ONLY,
  },
};

// TODO: use in signup form
const getCountrySpecificRegexs = (
  field: SignUpFormFields.USERNAME | SignUpFormFields.PHONE_NUMBER,
  country?: USER_COUNTRY
) => {
  return countrySpecificRegexsMap[field]?.[country || 'DEFAULT'];
};

export const getFormValidations = (
  params: GetFormValidationsParams = { t: () => '' }
) => {
  const { country, t } = params;

  const validation = {
    [SignInFormFields.USERNAME]: yup
      .string()
      .required(t('pleaseEnterValidUsername'))
      .matches(
        new RegExp(RegularExperessions.BASIC_USERNAME),
        t('pleaseEnterValidUsername')
      ),
    [SignInFormFields.PASSWORD]: yup.string().required(),
    [SignUpFormFields.COUNTRY]: yup.string().required(),
    [SignUpFormFields.USERNAME]: yup
      .string()
      .required(t('pleaseEnterValidUsername'+country))
      .matches(
        new RegExp(
          getCountrySpecificRegexs(SignUpFormFields.USERNAME, country)
        ),
        t('pleaseEnterValidUsername'+country)
      ),
    [SignUpFormFields.PASSWORD]: yup
      .string()
      .required(t('pleaseEnterValidPassword'))
      .matches(
        new RegExp(RegularExperessions.ALPHANUMERIC_AND_SPECIAL_CHARS),
        t('pleaseEnterValidPassword')
      ),
    [SignUpFormFields.NAME]: yup
      .string()
      .required(t('pleaseEnterValidName'))
      .matches(
        new RegExp(RegularExperessions.ALPHABETS_WITH_SPACE),
        t('pleaseEnterValidName')
      ),
    [SignUpFormFields.PHONE_NUMBER]: yup
      .string()
      .required(t('pleaseEnterValidPhoneNumber'+country))
      .matches(
        new RegExp(
          getCountrySpecificRegexs(SignUpFormFields.PHONE_NUMBER, country)
        ),
        t('pleaseEnterValidPhoneNumber'+country)
      ),
  };

  return getValidationSchemaFunc({ validation });
};
