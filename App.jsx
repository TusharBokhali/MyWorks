import {View, SafeAreaView, Text, StatusBar} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from './src/utils/Theme';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Colors.CHARCOLEBLUE}
        barStyle="light-content"
        translucent={true}
      />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
