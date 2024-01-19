import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import ProfileScreen from '../../profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.ROUTE_PROFILE}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}
