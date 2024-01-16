import { TextInputProps } from 'react-native-paper';
import { Controller, UseControllerProps } from 'react-hook-form';

import { TextInput, HelperText } from '../../atoms';

type ControlledTextInputProps = TextInputProps &
  UseControllerProps & {
    formatter?: (value: string) => string;
    helperTextType?: 'error' | 'info';
    helperText?: string;
    controllerProps?: ControlledTextInputProps;
    onChangeHandler?: (value: string) => void;
    errorMessage?: string;
  };
export const ControlledTextInput = (props: ControlledTextInputProps) => {
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
//   const { stickyMessage: error } = useShowHideMessage(value, errorMessage);

  const helperTextValue =
    helperTextType === 'error'
      ? errorMessage
        ? errorMessage
        : undefined
      : helperText
      ? helperText
      : undefined;
  return (
    <>
      <Controller
        control={control}
        // @ts-expect-error we are not in the type definition business
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...inputProps}
            onBlur={onBlur}
            value={formatter ? formatter(value) : value}
            onChangeText={(value: string) => {
              onChangeHandler && onChangeHandler(value);
              onChange(formatter ? formatter(value) : value);
            }}
          />
        )}
        {...controllerProps}
        name={name}
      />
      {helperTextValue && (
        // @ts-expect-error this is handled in the declaration of helperTextValue
        <HelperText type={helperTextType} visible={!!errorMessage}>
          {helperTextValue}
        </HelperText>
      )}
    </>
  );
};
