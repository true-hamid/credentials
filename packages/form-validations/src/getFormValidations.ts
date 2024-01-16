import { TFunction } from 'i18next';
import * as yup from 'yup';
import { SignInFormFields } from '@types';

import { RegularExperessions } from './regex';
import { getValidationSchemaFunc } from './utils';

type GetFormValidationsParams = {
  country?: number;
  t: TFunction | ((p: string) => string);
};

// TODO: use in signup form
// const countrySpecificValidations = (
//   field: SignInFormFields | PasswordFormFields,
//   country: string
// ) => {
//   if (field === SignInFormFields.USERNAME) {
//     switch (SignInFormFields.USERNAME + country) {
//       case SignInFormFields.USERNAME + USER_COUNTRY.AE:

//       // default:
//       //     break;
//     }
//   }
// };

export const getFormValidations = (
  params: GetFormValidationsParams = { t: () => '' }
) => {
  const {
    // country,
    t,
  } = params;

  const validation = {
    [SignInFormFields.USERNAME]: yup
      .string()
      .required()
      .matches(
        new RegExp(RegularExperessions.BASIC_USERNAME),
        t('pleaseEnterValidUsername')
      ),
    [SignInFormFields.PASSWORD]: yup.string().required(),
    // [ValidationSchemaKeys.IBAN]: yup
    //   .string()
    //   .required(getServicesTranslation(t, 'creditLimitIncrease.ibanEmptyError'))
    //   .matches(
    //     new RegExp(ibanRegex),
    //     getServicesTranslation(t, 'creditLimitIncrease.ibanInvalidError')
    //   ),
    // [ValidationSchemaKeys.CARD_DISPUTE_SELECT_REASON]: yup
    //   .string()
    //   .when(ValidationSchemaKeys.CARD_DISPUTE_INPUT_REASON, {
    //     is: (cardDisputeInputReasonValue: any) => !cardDisputeInputReasonValue,
    //     then: yup.string().required(),
    //   }),
    // [ValidationSchemaKeys.CARD_DISPUTE_INPUT_REASON]: yup
    //   .string()
    //   .when(ValidationSchemaKeys.CARD_DISPUTE_SELECT_REASON, {
    //     is: (cardDisputeSelectReasonValue: any) =>
    //       !cardDisputeSelectReasonValue,
    //     then: yup
    //       .string()
    //       .required()
    //       .matches(
    //         RegEx.COMPLAINT_FORM,
    //         t('global.contactForm.details.inputText')
    //       ),
    //   }),
  };

  return getValidationSchemaFunc({ validation });
};
