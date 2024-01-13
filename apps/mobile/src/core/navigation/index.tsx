import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import {useTranslation} from '@localization';

// Define your screen component
const HomeScreen = () => {
    const { t } = useTranslation();
    return (
        <View>
            <Text >{t('welcomeTitles')}</Text>
        </View>
    );
};

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Create your navigation container
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
