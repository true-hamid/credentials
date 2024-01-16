import { ReactNode } from 'react';
import {
  createTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@mui/material/styles';
import { ThemeProviderProps } from '@types';
import { useAppTheme, ThemeProvider as Provider } from '@theme';

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, value } = props;

  const { userCountry } = value ?? { userCountry: undefined };
  return (
    <Provider value={{userCountry}}>
      <THEME_PROVIDER>{children}</THEME_PROVIDER>
    </Provider>
  );
};

const THEME_PROVIDER = ({ children }: { children: ReactNode }) => {
  const theme = useAppTheme();
  const themeObj = createTheme({
    palette: {
      primary: {
        main: theme.colors.primary,
      },
    },
  });
  return (
    <MaterialThemeProvider theme={themeObj}>{children}</MaterialThemeProvider>
  );
};
