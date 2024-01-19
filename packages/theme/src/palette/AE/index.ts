import { amber, deepOrange, lightGreen, red } from '../../core/colors';
import * as Colors from './colors';

const AE = {
  colors: {
    primary: Colors.PRIMARY,
    text: Colors.TEXT,
    surface: Colors.SURFACE,
    elevation: {
      level2: Colors.ONSURFACE,
    },
    semantic: {
      success: {
        text: lightGreen[900],
        background: lightGreen[50],
      },
      error: {
        text: Colors.ERROR,
        background: red[50],
      },
      warning: {
        text: deepOrange[900],
        background: amber[50],
      },
    },
  },
  // add other theme specific variables here
  backgroundImage: 'https://wallpapercosmos.com/w/middle-retina/6/3/b/1403821-3840x2160-desktop-4k-dubai-skyline-wallpaper-image.jpg',
};

export default AE;
