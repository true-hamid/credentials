import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PreLoginStack } from './preLogin/navigators';
// import { View, Text } from 'react-native';
// import {useTranslation} from '@localization';

// // Define your screen component
// const HomeScreen = () => {
//     const { t } = useTranslation();
//     return (
//         <View>
//             <Text >{t('welcomeTitles')}</Text>
//         </View>
//     );
// };

// Create your navigation container
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <PreLoginStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
