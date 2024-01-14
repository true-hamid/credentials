import { Dimensions, Platform as DevicePlatform } from 'react-native';

export const width = Math.round(Dimensions.get('window').width);
export const scale = width / 375;

export enum Platform {
  iOS = 'ios',
  Android = 'android',
}

export const isIOS = DevicePlatform.OS === Platform.iOS;

export enum Sizes {
  xxs = 2,
  xs = 4,
  s = 8,
  m = 16,
  l = 24,
  xl = 32,
  xxl = 40,
  xxxl = 48,
}
