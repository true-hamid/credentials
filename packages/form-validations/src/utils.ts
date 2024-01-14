import * as yup from 'yup';

export const getValidationSchemaFunc = (params: {
  validation: { [key: string]: yup.AnySchema };
  shapeExecludes?: [string, string][] | undefined;
}) => {
  const { validation, shapeExecludes } = params;
  return (keys: Array<string> = []) => {
    const schemaValidation = keys.reduce(
      (accObj: yup.AnyObject, validationKey: string) => {
        if (Object.hasOwnProperty.call(validation, validationKey)) {
          accObj[validationKey] = validation[validationKey];
        }
        return accObj;
      },
      {}
    );
    return shapeExecludes
      ? yup.object().shape(schemaValidation, shapeExecludes)
      : yup.object().shape(schemaValidation);
  };
};
