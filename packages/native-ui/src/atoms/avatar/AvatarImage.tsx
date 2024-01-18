import { ImageSourcePropType, ViewStyle } from 'react-native';
import { ThemeObject } from '@types';
import { StyleSheet } from 'react-native';
import { Avatar as RNPAvatar } from 'react-native-paper';
import { useAppTheme } from '@theme';

export const AvatarImage = ({
  size,
  source,
  style: propStyles = {},
}: {
  source: ImageSourcePropType;
  style?: ViewStyle;
  size: number;
}): JSX.Element => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  return (
    <RNPAvatar.Image
      style={{
        ...styles.container,
        ...propStyles,
      }}
      size={size}
      source={source}
    />
  );
};

const getStyles = (theme: ThemeObject) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
    },
  });
