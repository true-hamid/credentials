import * as React from 'react';
import { Button } from '../../atoms';
import { default as MaterialMenu } from '@mui/material/Menu';
import { default as MaterialMenuItem } from '@mui/material/MenuItem';
import { MenuProps } from '@types';

export const Menu = ({
  clickableLabel,
  data,
  onItemSelect,
  anchorEl: propAnchorEl,
}: MenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log('Menu_data', data);
  console.log('Menu_', anchorEl);


  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {clickableLabel}
      </Button>
      <MaterialMenu
        id="basic-menu"
        anchorEl={propAnchorEl || anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {data?.map((item, index) => (
          <MaterialMenuItem
            key={index + item.value}
            onClick={() => {
              onItemSelect(item.value);
              handleClose();
            }}
            title={item.label}
          />
        ))}
      </MaterialMenu>
    </>
  );
};
