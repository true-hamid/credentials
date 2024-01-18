import { ReactNode } from 'react';
import { default as MaterialAlert } from '@mui/material/Alert';
import { SemanticVariant } from '@types';

export const Alert = ({
  visible = false,
  action,
  icon,
  message,
  variant,
}: {
  visible: boolean;
  action?: ReactNode;
  icon?: ReactNode;
  message: string;
  variant?: SemanticVariant;
}) => {
  return visible ? (
    <MaterialAlert
      icon={icon ? icon : null}
      action={action}
      severity={variant}
    >
      {message}
    </MaterialAlert>
  ) : null;
};
