import React from 'react';
import MaterialTextField, { TextFieldProps } from '@mui/material/TextField';

type CustomTextFieldProps = TextFieldProps;

export const TextField: React.FC<CustomTextFieldProps> = (props) => {
  return <MaterialTextField fullWidth variant="filled" {...props} />;
};
