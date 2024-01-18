import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobalStore } from '@global-store';

import { PreLoginStack } from './preLogin/navigators';
import { PostLoginStack } from './postLogin/navigators';
export const AppStack = createNativeStackNavigator();

const PRE_LOGIN_STACK = 'PreLogin';
const POST_LOGIN_STACK = 'PostLogin';

// Create your navigation container
const AppNavigation = () => {
  const { session } = useGlobalStore();
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {!session.authToken ? (
          <AppStack.Screen
            options={{ headerShown: false }}
            name={PRE_LOGIN_STACK}
            children={PreLoginStack}
          />
        ) : (
          <AppStack.Screen
            options={{ headerShown: false }}
            name={POST_LOGIN_STACK}
            children={PostLoginStack}
          />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
