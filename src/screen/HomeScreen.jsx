import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts} from '../utils/Theme';
import {
  horizontalScale,
  moderateScale,
  screenWidth,
  verticalScale,
} from '../utils/Metrics';
import {Images} from '../assets/image/image';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import Animated, {
  createAnimatedComponent,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import CustomButton from '../component/CustomButton';
const HomeScreen = () => {
  const AnimatedCard = Animated.createAnimatedComponent(TouchableOpacity);
  const [MyWidth, setMyWidth] = useState(Dimensions.get('window').width);

  const Data = [
    {
      id: 1,
      title: 'Total Rooms',
      num: 0,
      text: ' 0 fully occupied, 0 partially occupied, 0 vacant',
      range: 0.2,
      button: 'Manage Rooms',
      img: Images.ROOMTOTAL,
      color: '#1b54e3',
    },
    {
      id: 2,
      title: 'Total Tenants',
      num: 0,
      text: 'No tenants registered yet',
      range: 0.2,
      button: 'View all tenants',
      img: Images.TENATES,
      color: '#41bf95',
    },
    {
      id: 3,
      title: 'Pending Rents',
      num: 0,
      text: 'All rents are paid',
      range: 0.2,
      button: 'View pending rents',
      img: Images.PENDING,
      color: '#eda743',
    },
    {
      id: 4,
      title: 'Vacant Rooms',
      num: 0,
      text: 'All rooms are occupied',
      range: 0.2,
      button: 'Manage vacant rooms',
      img: Images.VACANT,
      color: '#ea5d5d',
    },
  ];

  useEffect(() => {
    const onChange = ({window}) => {
      setMyWidth(window.width);
      console.log('window', window.width);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
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
              <Animated.Image
                entering={FadeInLeft.duration(500).delay(200)}
                source={Images.THREELINE}
                style={{width: moderateScale(32), height: moderateScale(32)}}
              />
            </TouchableOpacity>
            <Animated.View
              style={styles.HederCenterStyle}
              entering={FadeInUp.duration(500).delay(200)}>
              <Text style={styles.HeaderText}>Sebzy</Text>
              <Text style={styles.HeaderTextSmall}>PG Management</Text>
            </Animated.View>
            <AnimatedCard
              entering={FadeInRight.duration(500).delay(200)}
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
              <View style={{marginLeft: moderateScale(8)}}>
                <Text style={[styles.HeaderText]}>Johan</Text>
                <Text style={[styles.HeaderTextSmall, {color: '#FFF'}]}>
                  India
                </Text>
              </View>
            </AnimatedCard>
          </View>

          <View style={styles.SectionMainView}>
            <Animated.View
              entering={FadeInUp.duration(500).delay(200)}
              style={{
                backgroundColor: '#121826',
                marginHorizontal: moderateScale(10),
                padding: moderateScale(20),
                borderRadius: moderateScale(10),
              }}>
              <Text
                style={[
                  styles.HeaderText,
                  {color: '#FFF', fontSize: moderateScale(22)},
                ]}>
                Welcome, Johan
              </Text>
              <Text style={[styles.HeaderTextSmall, {color: '#b1b1c7'}]}>
                India - Manage your PG hostel efficiently with our comprehensive
                dashboard
              </Text>
            </Animated.View>
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
                  backgroundColor: '#5149E6',
                  borderRadius: moderateScale(20),
                  marginLeft: -5,
                }}
              />
              <Animated.View
                entering={FadeInUp.duration(500).delay(200)}
                style={{
                  marginHorizontal: moderateScale(10),
                }}>
                <Text
                  style={[
                    styles.HeaderText,
                    {color: '#FFF', fontSize: moderateScale(22)},
                  ]}>
                  Dashboard Overview
                </Text>
              </Animated.View>
            </View>

            <AnimatedCard
              entering={FadeInUp.duration(500).delay(200)}
              style={{
                flex: 1,
                backgroundColor: '#5149E6',
                marginHorizontal: moderateScale(10),
                borderRadius: moderateScale(8),
                alignItems: 'center',
                padding: moderateScale(8),
                marginBottom: 20,
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
            </AnimatedCard>
            <FlatList
              data={Data}
              nestedScrollEnabled={true}
              contentContainerStyle={{paddingBottom: 30}}
              renderItem={({item, index}) => {
                return (
                  <AnimatedCard
                    entering={FadeInUp.duration(500).delay(200)}
                    style={styles.BoxMain}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          borderRadius: moderateScale(10),
                          padding: moderateScale(8),
                          backgroundColor: item.color,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            width: 28,
                            height: 28,
                          }}
                          source={item.img}
                        />
                      </View>
                      <View style={{marginLeft: moderateScale(10)}}>
                        <Text
                          style={[
                            styles.HeaderTextSmall,
                            {color: item.color, fontSize: moderateScale(16)},
                          ]}>
                          {item.title}
                        </Text>
                        <Text
                          style={[
                            styles.HeaderText,
                            {fontWeight: 800, fontSize: 20},
                          ]}>
                          {item.num}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.TextToSmall}>{item.text}</Text>

                    <View
                      style={{
                        marginVertical: moderateScale(10),
                        width: screenWidth - 40,
                        alignSelf: 'center',
                      }}>
                      <Progress.Bar
                        progress={0.2} // 20% progresed
                        color="#5386e6"
                        unfilledColor="#a6a9ad"
                        borderWidth={0}
                        borderRadius={12}
                        animated={true}
                        useNativeDriver={true}
                        width={MyWidth > 700 ? MyWidth * 0.86 : MyWidth * 0.82}
                        style={{marginHorizontal: 10, alignSelf: 'center'}}
                      />
                    </View>
                    <View style={styles.IconAndTitle}>
                      <Text style={[styles.MAnageRooms, {color: item.color}]}>
                        {item.button}
                      </Text>
                      <View style={{marginTop: 5}}>
                        <Octicons
                          name={'arrow-right'}
                          color={item.color}
                          size={18}
                        />
                      </View>
                    </View>
                  </AnimatedCard>
                );
              }}
            />
            <Animated.View
              entering={FadeInUp.duration(500).delay(200)}
              style={styles.ActionMain}>
              <View style={styles.flex}>
                <View
                  style={[styles.verticalLine, {backgroundColor: '#5149E6'}]}
                />
                <Text style={styles.HeadingText}>Quick Actions</Text>
              </View>
              <View style={{gap: 10, marginTop: 15}}>
                <CustomButton
                  text={'Add New Room'}
                  Bg={'#3272ed'}
                  img={'pluscircle'}
                  fun={() => {}}
                />
                <CustomButton
                  text={'Add New Tenant'}
                  Bg={'#089f6f'}
                  img={Images.TENATES}
                  fun={() => {}}
                />
                <CustomButton
                  text={'Record Rent Payment'}
                  Bg={'#e68808'}
                  img={'calendar-plus'}
                  fun={() => {}}
                />
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInUp.duration(500).delay(200)}
              style={styles.ActionMain}>
              <View style={styles.flex}>
                <View
                  style={[styles.verticalLine, {backgroundColor: '#5149E6'}]}
                />
                <Text style={styles.HeadingText}>Rent Status</Text>
              </View>
              <View style={[styles.flex, {marginTop: 10}]}>
                <Image
                  source={Images.VACANT}
                  tintColor={'red'}
                  style={{width: 22, height: 22}}
                />
                <Text style={styles.LastTExt}>{`Overdue Rents (0)`}</Text>
              </View>
              <View style={styles.Box}>
                <Text style={styles.BoxText}>No overdue rents! 🎉</Text>
              </View>

              <View style={[styles.flex, {marginTop: 40}]}>
                <Image
                  source={Images.PENDING}
                  style={{width: 22, height: 22}}
                />
                <Text
                  style={[
                    styles.LastTExt,
                    {color: 'orange'},
                  ]}>{`Upcoming Rent Dues (0)`}</Text>
              </View>
              <View
                style={[
                  styles.Box,
                  {backgroundColor: '#dbdbdb', borderColor: 'gray'},
                ]}>
                <Text style={[styles.BoxText, {color: 'gray', fontSize: 12}]}>
                  No upcoming rent dues in the next 30 days.
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
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
    fontSize: moderateScale(14),
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: '#5386e6',
    fontWeight: '700',
  },
  IconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  verticalLine: {
    width: 4,
    height: 17,
    borderRadius: 2,
  },
  ActionMain: {
    width: '100%',
    padding: 15,
    backgroundColor: '#121826',
    borderRadius: 12,
    marginBottom: 30,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  HeadingText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  LastTExt: {
    color: 'red',
    fontWeight: '600',
    fontSize: 15,
  },
  Box: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    borderColor: 'green',
    marginTop: 20,
    backgroundColor: '#f0fdf4',
  },
  BoxText: {
    textAlign: 'center',
    color: 'green',
    fontWeight: '500',
  },
});
