import { Text as RNPText, TextProps } from 'react-native-paper';
import { useAppTheme } from '@theme';

export const Text = ({ children, color, ...rest }: {color?: string } & TextProps<never>) => {
  const { colors } = useAppTheme();

  return (
    <RNPText {...rest} theme={{ colors: { onSurface: color || colors.text } }}>
      {children}
    </RNPText>
  );
};
