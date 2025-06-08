import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screen/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    return (
        <NavigationContainer>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </NavigationContainer>
    )
}

export default AppNavigator