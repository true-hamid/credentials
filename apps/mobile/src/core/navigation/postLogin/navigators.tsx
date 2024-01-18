import { Routes } from './routes';
import { AppStack } from '..';

import { DashboardStack } from '../../../features/dashboard/_config/nav/navigator';


export const PostLoginStack = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={{ headerShown: false }}
        name={Routes.ROUTE_DASHBOARD_NAVIGATOR}
        component={DashboardStack}
      />
    </AppStack.Navigator>
  );
};
