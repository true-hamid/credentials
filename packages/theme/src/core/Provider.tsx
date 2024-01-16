import React from 'react';
import { ThemeProviderProps } from '@types';
import { getTheme } from './helpers';
import ThemeContext from './ThemeContext';

export default (props: ThemeProviderProps) => {
  const { children, value } = props;

  const { userCountry } = value ?? {userCountry: undefined};
  return (
    <ThemeContext.Provider value={getTheme(userCountry)}>
      {children}
    </ThemeContext.Provider>
  );
};
