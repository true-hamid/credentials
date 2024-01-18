import { ImageSourcePropType, ViewStyle } from 'react-native';
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
  return (
    <RNPAvatar.Image
      style={{
        ...{backgroundColor: theme.colors.surface},
        ...propStyles,
      }}
      size={size}
      source={source}
    />
  );
};

