export type MenuProps = {
  clickableLabel: string;
  data: { label: string; value: string }[];
  onItemSelect: (value: string) => void;
  selectedItem?: string;
  anchorEl?: HTMLElement;
  menuVisible?: boolean;
  onCloseMenu?: () => void;
};
