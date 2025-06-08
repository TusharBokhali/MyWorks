import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CommonLayout from '../component/CommonLayout';
import { Colors, Fonts } from '../utils/Theme';
import {
  horizontalScale,
  moderateScale,
  screenWidth,
  verticalScale,
} from '../utils/Metrics';
import { Images } from '../assets/image/image';
import * as Progress from 'react-native-progress';

const HomeScreen = () => {
  // const Data = [{id: 1, title: 'totalRoom'}];

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          backgroundColor: Colors.GUNMETAL,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.HeaderMainView}>
            <TouchableOpacity
              style={{
                backgroundColor: '#1d1d3b',
                padding: moderateScale(6),
                borderRadius: moderateScale(12),
              }}>
              <Image
                source={Images.THREELINE}
                style={{ width: moderateScale(32), height: moderateScale(32) }}
              />
            </TouchableOpacity>
            <View style={styles.HederCenterStyle}>
              <Text style={styles.HeaderText}>Sebzy</Text>
              <Text style={styles.HeaderTextSmall}>PG Management</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#1d1d3b',
                padding: moderateScale(6),
                borderRadius: moderateScale(12),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: moderateScale(32),
                  height: moderateScale(32),
                  backgroundColor: '#FFF',
                  borderRadius: moderateScale(8),
                }}
                source={Images.USER}
              />
              <View style={{ marginLeft: moderateScale(8) }}>
                {/* <View> */}
                <Text style={[styles.HeaderText]}>Johan</Text>
                <Text style={[styles.HeaderTextSmall, { color: '#FFF' }]}>
                  Surat
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionMainView}>
            <View
              style={{
                backgroundColor: '#121826',
                marginHorizontal: moderateScale(10),
                padding: moderateScale(20),
                borderRadius: moderateScale(10),
              }}>
              <Text
                style={[
                  styles.HeaderText,
                  { color: '#FFF', fontSize: moderateScale(22) },
                ]}>
                Welcome, Johan
              </Text>
              <Text style={[styles.HeaderTextSmall, { color: '#b1b1c7' }]}>
                Surat - Manage your PG hostel efficiently with our comprehensive
                dashboard
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: moderateScale(20),
              }}>
              <View
                style={{
                  width: moderateScale(5),
                  height: moderateScale(20),
                  backgroundColor: 'red',
                  borderRadius: moderateScale(20),
                  marginLeft: -5,
                }}
              />
              <View
                style={{
                  marginHorizontal: moderateScale(10),
                }}>
                <Text
                  style={[
                    styles.HeaderText,
                    { color: '#FFF', fontSize: moderateScale(22) },
                  ]}>
                  Dashboard Overview
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#5149E6',
                marginHorizontal: moderateScale(10),
                borderRadius: moderateScale(8),
                alignItems: 'center',
                padding: moderateScale(8),
              }}>
              <Text
                style={[
                  styles.HeaderText,
                  {
                    color: '#FFF',
                    fontSize: moderateScale(18),
                    textAlign: 'center',
                  },
                ]}>
                Refresh Stats
              </Text>
            </TouchableOpacity>
            <View style={styles.BoxMain}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: moderateScale(10),
                    padding: moderateScale(8),
                    backgroundColor: '#1b54e3',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 28,
                      height: 28,
                    }}
                    source={Images.ROOMTOTAL}
                  />
                </View>
                <View style={{ marginLeft: moderateScale(10) }}>
                  <Text
                    style={[
                      styles.HeaderTextSmall,
                      { color: '#5386e6', fontSize: moderateScale(16) },
                    ]}>
                    Total Rooms
                  </Text>
                  <Text
                    style={[
                      styles.HeaderText,
                      { fontWeight: 800, fontSize: 20 },
                    ]}>
                    0
                  </Text>
                </View>
              </View>
              <Text style={styles.TextToSmall}>
                0 fully occupied, 0 partially occupied, 0 vacant
              </Text>

              <View
                style={{
                  marginVertical: moderateScale(10),
                  width: screenWidth - 40, // ✅ Define width of parent
                  alignSelf: 'center', // ✅ Optional: centers the bar on screen
                }}>
                <Progress.Bar
                  progress={0.2}
                  color="#5386e6"
                  unfilledColor="#a6a9ad"
                  borderWidth={0}
                  borderRadius={12}
                  animated={true}
                  useNativeDriver={true}
                  style={{
                    width: '100%', // ✅ This will now work correctly
                    overflow: 'hidden',
                  }}
                />
              </View>

              {/* <View
                style={{
                  marginVertical: moderateScale(10),
                }}>
                <Progress.Bar
                  progress={0.2} // 20% fill from left
                  color="#5386e6"
                  unfilledColor="#a6a9ad"
                  borderWidth={0}
                  borderRadius={12}
                  // width={(screenWidth - 34) - 40}
                  // width={{flex:1}}
                  animated={true}
                  style={{
                    flex: 4,
                    // width: '100%',
                    left: 0,
                    overflow: 'hidden',
                    // alignItems: 'left',
                    justifyContent: 'left',
                  }}
                  useNativeDriver={true}
                />
              </View> */}
              <Text style={styles.MAnageRooms}>Manage Rooms </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GUNMETAL,
  },
  HeaderMainView: {
    flex: 1,
    height: moderateScale(70),
    backgroundColor: '#1B243F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    alignItems: 'center',
  },
  HeaderText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: '#FFF',
    fontWeight: 700,
  },
  HeaderTextSmall: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: '#A1AFF6',
  },
  HederCenterStyle: {},
  SectionMainView: {
    flex: 1,
    maxHeight: '100%',
    paddingTop: moderateScale(10),
    backgroundColor: '#252944',
    paddingHorizontal: moderateScale(10),
  },
  BoxMain: {
    // flex: 1,
    // width: screenWidth * 0.9,
    width: '98%',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    backgroundColor: '#121826',
    alignSelf: 'center',
  },
  TextToSmall: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: '#ffffff',
    marginLeft: moderateScale(0),
    margin: moderateScale(10),
  },
  MAnageRooms: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: '#5386e6',
  },
});
