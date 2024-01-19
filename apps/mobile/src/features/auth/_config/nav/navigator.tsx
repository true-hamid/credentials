import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';

import SignInScreen from '../../signIn/SignInScreen';
import SignUpScreen from '../../signUp/SignUpScreen';
import { ChangeAppLanguage } from '../../../../core/language';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerRight: () => <ChangeAppLanguage />,
          headerTitle: '',
        }}
        name={Routes.ROUTE_SIGN_IN}
        component={SignInScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <ChangeAppLanguage />,
          headerTitle: '',
        }}
        name={Routes.ROUTE_SIGN_UP}
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
}
