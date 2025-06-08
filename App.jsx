import { View, SafeAreaView, Text, StatusBar } from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import HomeScreen from './src/screen/HomeScreen';
import { Colors } from './src/utils/Theme';

const App = () => {
  // return <AppNavigator />;

  return (
    // <View>
    <>
      <AppNavigator />
    </>
    // </View>
  );
};

export default App;
