import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import ProfileScreen from '../../profile/ProfileScreen';
import { ChangeAppLanguage } from '../../../../core/language';

const Stack = createNativeStackNavigator();

export function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerRight: () => <ChangeAppLanguage />,
          headerTitle: '',
        }}
        name={Routes.ROUTE_PROFILE}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}
