import * as React from 'react';
import Button from '@mui/material/Button';
import { default as MUIMenu } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuProps } from '@types-web';
import IconButton from '@mui/material/IconButton';

export const Menu = ({
  data,
  clickableLabel,
  onItemSelect,
  iconAnchor,
  sx,
}: MenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      {iconAnchor ? (
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {iconAnchor}
        </IconButton>
      ) : (
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {clickableLabel}
        </Button>
      )}
      <MUIMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        sx={sx}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {data.map((item, index) => (
          <MenuItem
            key={index + item.value}
            onClick={() => {
              onItemSelect(item.value);
              handleClose();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </MUIMenu>
    </div>
  );
};
