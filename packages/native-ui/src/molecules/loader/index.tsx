import { View } from 'react-native';
import { useAppTheme } from '@theme';
import {
  Portal,
  ActivityIndicator as RNPActivityIndicator,
} from 'react-native-paper';

export const Loader = ({ visible = false }: { visible: boolean }) => {
  const theme = useAppTheme();

  return visible ? (
    <Portal>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.9)',
          flex: 1,
        }}
      >
        <RNPActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    </Portal>
  ) : null;
};
