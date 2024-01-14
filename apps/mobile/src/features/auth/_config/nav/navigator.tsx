import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';

import SignInScreen from '../../signIn/SignInScreen';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.ROUTE_SIGN_IN}
        component={SignInScreen}
      />
    </Stack.Navigator>
  );
}
