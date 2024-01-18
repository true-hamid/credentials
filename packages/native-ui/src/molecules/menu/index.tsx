import * as React from 'react';
import { Button, Menu as RNPMenu } from 'react-native-paper';
import { MenuProps } from '@types';

export const Menu = ({
  clickableLabel,
  data,
  selectedItem,
  onItemSelect,
  anchorStyle,
}: MenuProps) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <RNPMenu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button style={anchorStyle} compact onPress={openMenu}>
          {clickableLabel}
        </Button>
      }
    >
      {data?.map((item,index) => (
        <RNPMenu.Item
          key={index+item.value}
          onPress={() => {
            onItemSelect(item.value);
            closeMenu();
          }}
          title={item.label}
        />
      ))}
    </RNPMenu>
  );
};
