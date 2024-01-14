import { Text as RNPText, TextProps } from 'react-native-paper';
import { useAppTheme } from '@theme';

export const Text = ({ children, ...rest }: TextProps<never>) => {
  const { colors } = useAppTheme();

  return (
    <RNPText {...rest} theme={{ colors: { onSurface: colors.text } }}>
      {children}
    </RNPText>
  );
};
