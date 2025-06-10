import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { moderateScale, screenHeight } from '../utils/Metrics';
import { Colors, Fonts } from '../utils/Theme';
import CustomButton from '../component/CustomButton';

const TenantsScreen = () => {
  const AnimatedCard = Animated.createAnimatedComponent(TouchableOpacity);
  const [MyWidth, setMyWidth] = useState(Dimensions.get('window').width);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginLeft: moderateScale(10) }}>
        <Text style={[styles.HeaderText, { fontSize: moderateScale(22) }]}>
          Tenants
        </Text>
      </View>
      <AnimatedCard
        style={[styles.BoxMain, { position: 'absolute', top: screenHeight / 4 }]}>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </AnimatedCard>
      <AnimatedCard
        entering={FadeInUp.duration(500).delay(200)}
        style={styles.BoxMain}>
        <Text style={[styles.TextToSmall]}>
          No tenants found. Add your tenant to get started.
        </Text>
        <View style={styles.IconAndTitle}>
          <CustomButton
            text={'+ Add Tenants'}
            Bg={Colors.BLUE}
            // Bg={'rgba(165, 180, 252, 0.5)'}
            fun={() => { }}
          />
        </View>
      </AnimatedCard>
    </SafeAreaView>
  );
};

export default TenantsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CHARCOLEBLUE,
  },
  BoxMain: {
    // flex: 1,
    // width: screenWidth * 0.9,
    width: '90%',
    marginHorizontal: moderateScale(30),
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.DARKBLUE,
    alignSelf: 'center',
    position: 'absolute',
    top: screenHeight / 2 - 20,
  },
  HeaderText: {
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    // color: 'rgb(31, 41, 55)',
    color: '#fff',
    fontWeight: 600,
  },
  TextToSmall: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: '#ffffff',
    textAlign: 'center',
    margin: moderateScale(10),
  },
  IconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
  },
});
