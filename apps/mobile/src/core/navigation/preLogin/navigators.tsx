import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';

import { AuthStack } from '../../../features/auth/_config/nav/navigator';

const Stack = createNativeStackNavigator();

export const PreLoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.ROUTE_AUTH_NAVIGATOR}
        component={AuthStack}
      />
    </Stack.Navigator>
  );
};
