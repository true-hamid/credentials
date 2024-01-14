import { StyleSheet } from 'react-native';
import { Button as RNPButton, ButtonProps } from 'react-native-paper';
import { useAppTheme } from '@theme';

export const Button = ({ children, ...rest }: ButtonProps) => {
  const { colors } = useAppTheme();
  return (
    <RNPButton
      {...rest}
      style={styles.container}
      theme={{ colors: { primary: colors.primary, outline: colors.primary } }}
    >
      {children}
    </RNPButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    height: 48,
    justifyContent: 'center',
  },
});
