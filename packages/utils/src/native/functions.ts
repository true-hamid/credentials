import { PixelRatio } from 'react-native';
import { isIOS, scale } from './constants';

export const normalize = (size: number): number => {
  const newSize = size * scale;

  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
