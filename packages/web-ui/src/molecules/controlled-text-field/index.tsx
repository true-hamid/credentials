import { Controller, UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';
import { TextField } from '../../atoms';

type ControlledTextInputProps = TextFieldProps &
  UseControllerProps & {
    formatter?: (value: string) => string;
    helperTextType?: 'error' | 'info';
    helperText?: string;
    controllerProps?: ControlledTextInputProps;
    onChangeHandler?: (value: string) => void;
    errorMessage?: string;
  };

export const ControlledTextField = (props: ControlledTextInputProps) => {
  const {
    control,
    errorMessage,
    name,
    onChangeHandler,
    controllerProps,
    formatter,
    helperTextType,
    helperText,
    value,
    ...inputProps
  } = props;

  const helperTextValue =
    helperTextType === 'error'
      ? errorMessage
        ? errorMessage
        : undefined
      : helperText
      ? helperText
      : undefined;

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          {...inputProps}
          onBlur={onBlur}
          value={formatter ? formatter(value) : value}
          onChange={(e) => {
            const value = e.target.value;
            onChangeHandler && onChangeHandler(value);
            onChange(formatter ? formatter(value) : value);
          }}
          error={helperTextType === 'error' && !!errorMessage}
          helperText={helperTextValue ? helperTextValue : undefined}
        />
      )}
      {...controllerProps}
      name={name}
    />
  );
};
