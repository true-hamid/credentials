import { useEffect, useState } from 'react';
import { i18n } from '@localization';
import { SignInFormFields, SignUpFormFields, USER_COUNTRY } from '@types';
import { getFormValidations, useDynamicForm } from '@form-validations';

export const useSignUpForm = (country?: USER_COUNTRY) => {
  const [validationSchema, setValidationSchema] = useState(() =>
    getFormValidations({ t: i18n.t, country })
  );
  useEffect(() => {
    if (country)
      setValidationSchema(() => getFormValidations({ t: i18n.t, country }));
  }, [country]);
  // const validationSchema = getFormValidations({ t: i18n.t, country });

  const { control, handleSubmit, errors, isValidForm, getValues } =
    useDynamicForm({
      // @ts-expect-error we are not in the type definition business
      mode: 'onChange',
      reValidateMode: 'onChange',
      schema: validationSchema([
        SignUpFormFields.COUNTRY,
        SignUpFormFields.NAME,
        SignUpFormFields.USERNAME,
        SignUpFormFields.PHONE_NUMBER,
        SignUpFormFields.PASSWORD,
      ]),
    });

  return {
    control,
    handleSubmit,
    errors,
    isValidForm,
    getValues,
  };
};
