import {View, SafeAreaView, Text, StatusBar} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#5149E6"
        barStyle="light-content"
        translucent={true}
      />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
