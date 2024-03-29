import { Routes } from './routes';

import { AuthStack } from '../../../features/auth/_config/nav/navigator';
import { AppStack } from '..';

export const PreLoginStack = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={{ headerShown: false }}
        name={Routes.ROUTE_AUTH_NAVIGATOR}
        component={AuthStack}
      />
    </AppStack.Navigator>
  );
};
