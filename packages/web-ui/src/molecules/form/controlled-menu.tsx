import { Controller, UseControllerProps } from 'react-hook-form';
import { MenuProps } from '@types-web';
import { Menu } from '../menu';

type ControlledMenuProps = MenuProps &
  UseControllerProps & {
    controllerProps?: ControlledMenuProps;
    onItemSelect?: (value: string) => void;
  };
export const ControlledMenu = (props: ControlledMenuProps) => {
  const {
    control,
    name,
    onItemSelect,
    controllerProps,
    data,
    clickableLabel = '',
    ...menuProps
  } = props;

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <Menu
          {...menuProps}
          data={data}
          clickableLabel={
            value
              ? data.find(
                  (datum: { value: string; label: string }) =>
                    datum.value === value
                )?.label || clickableLabel
              : clickableLabel
          }
          onItemSelect={(value: string) => {
            onItemSelect && onItemSelect(value);
            onChange(value);
          }}
        />
      )}
      {...controllerProps}
      name={name}
    />
  );
};
