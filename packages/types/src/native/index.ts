import { ReactNode } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { Size } from '../';

export type SpacerProps = ViewProps & {
  /**
   * `size` for the spacer
   */
  size: Size;

  /**
   * `vertical` default type, sets the vertical spacing
   */
  vertical?: boolean;
};

export type MenuProps = {
    clickableLabel: string;
    data: { label: string; value: string }[];
    onItemSelect: (value: string) => void;
    anchorStyle?: StyleProp<ViewStyle>;
    selectedItem?: string;
    anchor?: ReactNode;
    menuVisible?: boolean;
    onCloseMenu?: () => void;
  };
