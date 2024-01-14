import THEMEPALETTES from '../palette';
import { USER_COUNTRY } from '@types';

const themeMapping = {
  [USER_COUNTRY.AE]: USER_COUNTRY.AE,
  [USER_COUNTRY.SD]: USER_COUNTRY.SD,
  [USER_COUNTRY.IN]: USER_COUNTRY.IN,
};

export const getTheme = (userCountry?: USER_COUNTRY) => {
  // @ts-expect-error userCountry will be undefined initially which is handled in the switch case
  const selectedTheme: USER_COUNTRY = themeMapping?.[userCountry];

  switch (selectedTheme) {
    case USER_COUNTRY.AE:
      return THEMEPALETTES.AE;
    case USER_COUNTRY.SD:
      return THEMEPALETTES.SD;
    case USER_COUNTRY.IN:
      return THEMEPALETTES.IN;
    default:
      return THEMEPALETTES.DEFAULT;
  }
};
