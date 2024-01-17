import { TextInput as RNPTextInput, TextInputProps } from 'react-native-paper';
import { useAppTheme } from '@theme';

export const TextInput = ({ ...rest }: TextInputProps) => {
  const { colors } = useAppTheme();

  return (
    <RNPTextInput
      {...rest}
      theme={{
        colors: { primary: colors.primary, surfaceVariant: colors.elevation.level2 },
      }}
    />
  );
};
