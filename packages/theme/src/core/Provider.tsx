import React from 'react';
import { ProviderProps } from '../types';
import { getTheme } from './helpers';
import ThemeContext from './ThemeContext';

export default (props: ProviderProps) => {
  const { children, value } = props;

  const { userCountry } = value;
  return (
    <ThemeContext.Provider value={getTheme(userCountry)}>
      {children}
    </ThemeContext.Provider>
  );
};
