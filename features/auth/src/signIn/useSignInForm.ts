import {useEffect} from 'react';
import { i18n } from '@localization';
import { SignInFormFields } from '@types';
import { getFormValidations, useDynamicForm } from '@form-validations';

export const useSignInForm = () => {
  const validationSchema = getFormValidations({ t: i18n.t });

  const { control, handleSubmit, errors, isValidForm, getValues } =
    useDynamicForm({
      // @ts-expect-error we are not in the type definition business
      mode: 'onChange',
      reValidateMode: 'onChange',
      schema: validationSchema([
        SignInFormFields.USERNAME,
        SignInFormFields.PASSWORD,
      ]),
    });

    useEffect(() => {
      console.log('FORRM', getValues());
      console.log('FORRM_errror', errors);
      console.log('FORRM_isValidForm', isValidForm);
    }, [getValues()]);

  return {
    control,
    handleSubmit,
    errors,
    isValidForm,
    getValues,
  };
};
