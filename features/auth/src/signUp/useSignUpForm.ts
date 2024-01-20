import { useEffect, useState } from 'react';
import { i18n } from '@localization';
import { SignUpFormFields, USER_COUNTRY } from '@types';
import { getFormValidations, useDynamicForm } from '@form-validations';

const formFields = [
  SignUpFormFields.COUNTRY,
  SignUpFormFields.NAME,
  SignUpFormFields.USERNAME,
  SignUpFormFields.PHONE_NUMBER,
  SignUpFormFields.PASSWORD,
];
export const useSignUpForm = (country?: USER_COUNTRY) => {
  const [validationSchema, setValidationSchema] = useState(() =>
    getFormValidations({ t: i18n.t, country })
  );

  const { control, handleSubmit, errors, reset, isValidForm, getValues } =
    useDynamicForm({
      // @ts-expect-error we are not in the type definition business
      mode: 'onChange',
      reValidateMode: 'onChange',
      schema: validationSchema(formFields),
    });

  useEffect(() => {
    if (country) {
      setValidationSchema(() => getFormValidations({ t: i18n.t, country }));
      reset({
        [SignUpFormFields.COUNTRY]: country,
        [SignUpFormFields.NAME]: '',
        [SignUpFormFields.USERNAME]: '',
        [SignUpFormFields.PHONE_NUMBER]: '',
        [SignUpFormFields.PASSWORD]: '',
      });
    }
  }, [country]);

  return {
    control,
    handleSubmit,
    errors,
    isValidForm,
    getValues,
  };
};
