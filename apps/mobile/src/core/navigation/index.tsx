import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PreLoginStack } from './preLogin/navigators';

// Create your navigation container
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <PreLoginStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
