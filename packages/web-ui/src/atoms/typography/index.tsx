import React from 'react';
import MaterialTypography, { TypographyProps } from '@mui/material/Typography';
import { useAppTheme } from '@theme';

interface CustomTypographyProps extends TypographyProps {}

export const Typography: React.FC<CustomTypographyProps> = (props) => {
  const theme = useAppTheme();
  const { color, ...otherProps } = props;

  return (
    <MaterialTypography style={{ color: theme.colors.text }} {...otherProps}>
      {props.children}
    </MaterialTypography>
  );
};
