import { HelperText as RNPText, HelperTextProps } from 'react-native-paper';

export const HelperText = ({ children, ...rest }: HelperTextProps) => {
  return <RNPText {...rest}>{children}</RNPText>;
};
