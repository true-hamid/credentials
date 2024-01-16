import { ReactNode } from 'react';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider as PaperThemeProvider,
} from 'react-native-paper';
import { ThemeProviderProps } from '@types';
import { useAppTheme, ThemeProvider as Provider } from '@theme';

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, value } = props;

  const { userCountry } = value ?? { userCountry: undefined };
  return (
    <Provider value={{ userCountry }}>
      <THEME_PROVIDER>{children}</THEME_PROVIDER>
    </Provider>
  );
};

const THEME_PROVIDER = ({ children }: { children: ReactNode }) => {
  const theme = useAppTheme();
  const themeObj = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      ...theme.colors,
    },
  };
  return <PaperThemeProvider theme={themeObj}>{children}</PaperThemeProvider>;
};
