import * as React from 'react';
import { Button, Menu as RNPMenu } from 'react-native-paper';

export const Menu = ({
  clickableLabel,
  data,
  onItemSelect,
}: {
  clickableLabel: string;
  data: { label: string; value: string }[];
  onItemSelect: (value: string) => void;
}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <RNPMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Button mode="elevated" onPress={openMenu}>{clickableLabel}</Button>}
    >
      {data?.map((item) => (
        <RNPMenu.Item
          onPress={() => {
            onItemSelect(item.value);
          }}
          title={item.label}
        />
      ))}
    </RNPMenu>
  );
};
