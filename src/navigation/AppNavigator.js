import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '../utils/Theme';
import SplashScreen from '../screen/SplashScreen';
export default function AppNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
         <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='SplashScreen'>
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}