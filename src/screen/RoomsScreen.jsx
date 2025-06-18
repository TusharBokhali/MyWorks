import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';
import {Colors, Fonts} from '../utils/Theme';
import {Images} from '../assets/image/image';

export default function RoomsScreen() {
  return (
    <View style={styles.container}>
      <View style={{margin: moderateScale(20)}}>
        <Text style={[styles.HeaderText, styles.header]}>Room</Text>
      </View>

      <View
        style={{
          marginTop: moderateScale(100),
          width: screenWidth * 0.8,
          height: screenHeight / 4,
          backgroundColor: Colors.GUNMETAL,
          borderRadius: moderateScale(8),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Image
            style={{width: moderateScale(72), height: moderateScale(72)}}
            source={Images.TROOM}
          />
        </View>
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: 'center',
            marginHorizontal: moderateScale(30),
            marginVertical: moderateScale(10),
          }}>
          No rooms found. Add your room to get started.
        </Text>
        <TouchableOpacity style={[styles.Button]}>
          <Text style={styles.BTNTEXT}>+ Add Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: screenHeight,
    maxHeight: screenHeight,
    backgroundColor: Colors.CHARCOLEBLUE,
    alignItems: 'center',
  },
  header: {
    width: screenWidth * 0.8,
    fontSize: moderateScale(22),
    fontWeight: '800',
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.WHITE,
  },

  Button: {
    width: '90%',
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DARKBLUE,
    borderRadius: 7,
  },
  BTNTEXT: {
    fontSize: moderateScale(15),
    color: Colors.WHITE,
    fontWeight: 700,
    fontFamily: Fonts.POPPINS_BOLD,
  },
});
