import { Button, Banner as RNPBanner } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { $RemoveChildren } from 'react-native-paper/lib/typescript/types';

export const Banner = ({
  visible = false,
  actions,
  icon,
  message,
}: {
  visible: boolean;
  actions?: Array<{ label: string } & $RemoveChildren<typeof Button>>;
  icon?: IconSource;
  message: string;
}) => {
  return (
    <RNPBanner visible={visible} actions={actions} icon={icon}>
      {message}
    </RNPBanner>
  );
};
