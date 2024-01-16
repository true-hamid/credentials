import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type useDynamicFormProps = yup.AnyObjectSchema & {
  schema: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | yup.ObjectSchema<any, yup.AnyObject, any, ''>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | yup.Lazy<any, yup.AnyObject, any>;
};

export const useDynamicForm = ({
  schema = yup.object().shape({}),
  ...restUseFormDefaultProps
}: useDynamicFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formParams: { resolver?: any } = {};
  if (Object.keys(schema).length > 0) {
    formParams['resolver'] = yupResolver(schema);
  }
  const { control, ...formProps } = useForm({
    ...restUseFormDefaultProps,
    ...formParams,
  });

  const { isDirty, isValid, errors } = formProps.formState;
  const doErrorsExist = errors && Object.keys(errors).length > 0;

  const isValidForm = !doErrorsExist && isValid && isDirty;

  return {
    ...formProps,
    isValidForm,
    control,
    errors,
  };
};
