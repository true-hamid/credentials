import { Animated, PermissionsAndroid, PixelRatio } from 'react-native';
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

// import * as Colors from './colors';

export function shadow(elevation: number | Animated.Value = 0) {
  const SHADOW_COLOR = '#000';
  const SHADOW_OPACITY = 0.24;
  if (elevation instanceof Animated.Value) {
    const inputRange = [0, 1, 2, 3, 8, 24];

    return {
      shadowColor: SHADOW_COLOR,
      shadowOffset: {
        width: new Animated.Value(0),
        height: elevation.interpolate({
          inputRange,
          outputRange: [0, 0.5, 0.75, 2, 7, 23],
        }),
      },
      shadowOpacity: new Animated.Value(SHADOW_OPACITY),
      shadowRadius: elevation.interpolate({
        inputRange,
        outputRange: [0, 0.75, 1.5, 3, 8, 24],
      }),
    };
  } else {
    if (elevation === 0) {
      return {};
    }

    let height, radius;
    switch (elevation) {
      case 1:
        height = 0.5;
        radius = 0.75;
        break;
      case 2:
        height = 0.75;
        radius = 1.5;
        break;
      default:
        height = elevation - 1;
        radius = elevation;
    }

    const androidStyles = !isIOS
      ? {
          elevation,
        }
      : {};

    return {
      shadowColor: SHADOW_COLOR,
      shadowOffset: {
        width: 0,
        height,
      },
      shadowOpacity: SHADOW_OPACITY,
      shadowRadius: radius,
      ...androidStyles,
    };
  }
}
