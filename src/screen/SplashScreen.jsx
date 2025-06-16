import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {screenWidth} from '../utils/Metrics';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../assets/image/image';
import Video from 'react-native-video';

export default function SplashScreen() {
  const {replace} = useNavigation();
  useEffect(() => {
    let time = setTimeout(() => {
      replace('HomeScreen');
    }, 1500);
    return () => {
      clearTimeout(time);
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      {/* <Video
        source={require('../assets/viedo/SEBZYFORYOU.mp4')}
        style={styles.video}
        resizeMode="cover"
        onEnd={() => replace('HomeScreen')}
        muted={true}
        repeat={false}
      /> */}

      <Image source={Images.SplashScreen} style={styles.Images} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  Images: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
  },
  video: {
    flex: 1,
  },
});
