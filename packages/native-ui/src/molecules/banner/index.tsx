import { useAppTheme } from '@theme';
import { SemanticVariant } from '@types';
import { Button, Banner as RNPBanner, BannerProps } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { $RemoveChildren } from 'react-native-paper/lib/typescript/types';
import { Text } from '../../atoms';

export const Banner = ({
  visible = false,
  actions,
  icon,
  message,
  variant = SemanticVariant.INFO,
}: {
  visible: boolean;
  actions?: Array<{ label: string } & $RemoveChildren<typeof Button>>;
  icon?: IconSource;
  message: string;
  elevation?: unknown;
  variant?: SemanticVariant;
}) => {
  const theme = useAppTheme();
  const backgroundColor =
    variant !== SemanticVariant.INFO
      ? { backgroundColor: theme.colors.semantic[variant].background }
      : {};
  const textColor =
    variant !== SemanticVariant.INFO
      ? theme.colors.semantic[variant].text
      : undefined;

  return (
    <RNPBanner
      elevation={2}
      visible={visible}
      style={{ ...backgroundColor }}
      actions={actions}
      icon={icon}
    >
      <Text color={textColor}>{message}</Text>
    </RNPBanner>
  );
};
