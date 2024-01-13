import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

// Define your screen component
const HomeScreen = () => {
    return (
        <View>
            <Text>Welcome to the Home Screen!</Text>
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
