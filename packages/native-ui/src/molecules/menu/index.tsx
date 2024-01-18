import * as React from 'react';
import { Button, Menu as RNPMenu } from 'react-native-paper';
import { MenuProps } from '@types';

export const Menu = ({
  clickableLabel,
  data,
  selectedItem,
  onItemSelect,
  anchorStyle,
  anchor,
  menuVisible,
  onCloseMenu,
}: MenuProps) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
    onCloseMenu && onCloseMenu();
  };

  return (
    <RNPMenu
      visible={menuVisible !== undefined ? menuVisible : visible}
      onDismiss={closeMenu}
      anchor={
        anchor || (
          <Button style={anchorStyle} compact onPress={openMenu}>
            {clickableLabel}
          </Button>
        )
      }
    >
      {data?.map((item, index) => (
        <RNPMenu.Item
          key={index + item.value}
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
