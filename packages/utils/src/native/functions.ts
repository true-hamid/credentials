import { PermissionsAndroid, PixelRatio } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { isIOS, scale } from './constants';

export const normalize = (size: number): number => {
  const newSize = size * scale;

  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export async function tryToGetFCMToken() {
  if (isIOS) {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      return token;
    }

    return false;
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const token = await messaging().getToken();
      return token;
    }
    return false;
  }
}
