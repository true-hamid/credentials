import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';

import SignInScreen from '../../signIn/SignInScreen';
import SignUpScreen from '../../signUp/SignUpScreen';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.ROUTE_SIGN_IN}
        component={SignInScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.ROUTE_SIGN_UP}
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
}
