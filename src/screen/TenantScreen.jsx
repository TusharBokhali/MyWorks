import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {FadeInLeft, FadeInUp} from 'react-native-reanimated';
import {moderateScale, screenHeight} from '../utils/Metrics';
import {Colors, Fonts} from '../utils/Theme';
import CustomButton from '../component/CustomButton';
import {Dropdown} from 'react-native-element-dropdown';

const TenantScreen = () => {
  const AnimatedCard = Animated.createAnimatedComponent(TouchableOpacity);
  const [MyWidth, setMyWidth] = useState(Dimensions.get('window').width);
  const [value, setValue] = useState(null);

  const data = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedCard
        entering={FadeInLeft.duration(500).delay(200)}
        style={{margin: moderateScale(20)}}>
        <Text
          style={[
            styles.HeaderText,
            {
              fontSize: moderateScale(22),
              fontWeight: 800,
              fontFamily: Fonts.POPPINS_BOLD,
            },
          ]}>
          Tenants
        </Text>
      </AnimatedCard>
      <AnimatedCard
        entering={FadeInUp.duration(500).delay(200)}
        style={[styles.BoxMain, {position: 'absolute', top: screenHeight / 4}]}>
        <View>
          <TextInput
            style={{
              paddingHorizontal: moderateScale(8),
              borderRadius: moderateScale(7),
              backgroundColor: '#6baced',
              color: Colors.DARKBLUE,
              fontSize: 16,
            }}
            placeholderTextColor={Colors.DARKBLUE}
            placeholder="Search by name, email or phone"
          />
          <View
            style={{
              flexDirection: 'row',
              margin: moderateScale(10),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: Colors.WHITE,
                margin: moderateScale(10),
                marginLeft: 0,
              }}>
              Staus :
            </Text>
            <Dropdown
              data={data}
              labelField="label"
              valueField="value"
              value={value}
              onChange={item => setValue(item.value)}
              placeholder="Select option"
              placeholderTextColor="red"
              style={{
                color: '#FFF',
                borderWidth: 1,
                borderRadius: moderateScale(7),
                borderColor: Colors.WHITE,
                padding: moderateScale(10),
                width: moderateScale(200),
                // height: screenHeight * 0.06,
              }}
            />
          </View>
        </View>
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
            fun={() => {}}
          />
        </View>
      </AnimatedCard>
    </SafeAreaView>
  );
};

export default TenantScreen;

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 2,
    backgroundColor: Colors.CHARCOLEBLUE,
  },
  BoxMain: {
    // flex: 1,
    width: '90%',
    marginHorizontal: moderateScale(30),
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.DARKBLUE,
    alignSelf: 'center',
    position: 'absolute',
    top: screenHeight / 2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: Colors.WHITE,
    shadowOpacity: 1,
    shadowRadius: 6.27,
    elevation: 1,
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
