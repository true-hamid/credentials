import { useContext } from 'react';
import ThemeContext from './ThemeContext';


const useAppTheme = () => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default useAppTheme;