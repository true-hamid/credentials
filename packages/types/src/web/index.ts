export type MenuProps = {
  data: { label: string; value: string }[];
  clickableLabel?: string;
  onItemSelect: (value: string) => void;
  iconAnchor?: React.ReactElement;
};
