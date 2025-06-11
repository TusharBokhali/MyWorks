import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {FadeInLeft, FadeInUp} from 'react-native-reanimated';
import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';
import {Colors, Fonts} from '../utils/Theme';
import CustomButton from '../component/CustomButton';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {Images} from '../assets/image/image';

const TenantScreen = () => {
  const AnimatedCard = Animated.createAnimatedComponent(TouchableOpacity);
  const [MyWidth, setMyWidth] = useState(Dimensions.get('window').width);
  const [value, setValue] = useState(null);
  const [text, setText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSelectProof, setIsSelectProof] = useState(false);

  const data = [
    {label: 'All Tenants', value: '1'},
    {label: 'Active', value: '2'},
    {label: 'Inactive', value: '3'},
  ];

  const loadSelectedValue = async () => {
    const savedValue = await AsyncStorage.getItem('tenantStatus');
    if (savedValue) {
      setValue(savedValue);
    }
  };

  const handleDropdownChange = async item => {
    setValue(item.value);
    await AsyncStorage.setItem('tenantStatus', item.value);
  };

  useEffect(() => {
    loadSelectedValue();
  }, []);

  const AddDataFromUser = () => {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            // alignItems: 'center',
            marginHorizontal: moderateScale(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginTop: moderateScale(20),
            }}>
            <View
              style={{
                width: moderateScale(5),
                height: moderateScale(22),
                backgroundColor: Colors.BLUE,
                borderRadius: moderateScale(20),
                justifyContent: 'center',
              }}
            />
            <View
              entering={FadeInUp.duration(500).delay(200)}
              style={{
                marginHorizontal: moderateScale(10),
              }}>
              <Text
                style={[
                  styles.HeaderText,
                  {color: '#FFF', fontSize: moderateScale(22)},
                ]}>
                Add New Tenant
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: moderateScale(20),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomButton
              text={'<- Back To tenants'}
              Bg={Colors.BLUE}
              fun={() => setModalVisible(false)}
            />
          </View>

          <View
            style={{
              backgroundColor: Colors.BACKDROP,
              width: screenWidth * 0.88,
              padding: moderateScale(20),
              borderRadius: moderateScale(20),
              rowGap: moderateScale(10),
              marginBottom: moderateScale(20),
            }}>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TUSER} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> Full Name</Text>
              </View>

              <TextInput
                placeholder="Enter tenant's full name"
                style={styles.inputmodal}
              />
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TEMAIL} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> Email Address</Text>
              </View>

              <TextInput
                placeholder="Enter email address (optional)"
                style={styles.inputmodal}
              />
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TEMAIL} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> Phone Number</Text>
              </View>

              <TextInput
                placeholder="Enter phone number"
                style={styles.inputmodal}
              />
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TEMAIL} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> Occupation</Text>
              </View>

              <TextInput
                placeholder="Enter Occupation (optional)"
                style={styles.inputmodal}
              />
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TIDPROOF} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> ID Proof Type</Text>
              </View>

              <TextInput // yaha pe input box hata ke dropdown rakhna hai
                placeholder="Enter tenant's full name"
                style={styles.inputmodal}
              />
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TIDPROOF} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> ID Proof Number</Text>
              </View>

              <TextInput
                placeholder="Enter ID proof number"
                style={styles.inputmodal}
              />
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TROOM} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> Room</Text>
              </View>

              <TextInput //  yaha bhi dropdown add kar na hai
                placeholder="Enter tenant's full name"
                style={styles.inputmodal}
              />
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TCALENDER} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> Joining Date</Text>
              </View>

              <TextInput // date piker addd karna hai
                placeholder="Enter email address (optional)"
                style={styles.inputmodal}
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isModalVisible ? (
        AddDataFromUser()
      ) : (
        <>
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
          <View
            entering={FadeInUp.duration(500).delay(200)}
            style={[
              styles.BoxMain,
              {position: 'absolute', top: screenHeight / 4},
            ]}>
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
                value={text}
                onChangeText={setText}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: moderateScale(20),
                  marginLeft: 0,
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    fontWeight: 800,
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
                  onChange={handleDropdownChange}
                  placeholder="Select option"
                  placeholderStyle={{
                    color: '#fff',
                  }}
                  style={{
                    width: screenWidth * 0.62,
                    borderWidth: 1,
                    borderRadius: moderateScale(8),
                    borderColor: '#6baced',
                    padding: moderateScale(8),
                  }}
                  selectedTextStyle={{
                    color: '#fff',
                    fontSize: moderateScale(18),
                    fontWeight: 600,
                    borderRadius: moderateScale(8),
                  }}
                  containerStyle={{
                    fontSize: moderateScale(22),
                    borderRadius: moderateScale(8),
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}
                />
              </View>
            </View>
          </View>
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
                fun={() => setModalVisible(true)}
              />
            </View>
          </AnimatedCard>
        </>
      )}
    </SafeAreaView>
  );
};

export default TenantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowOpacity: 0.6,
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
  },
  imageMOdal: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: '#fff',
  },
  TextHeaderModal: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
    color: Colors.WHITE,
  },
  inputmodal: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: moderateScale(12),
    borderRadius: 8,
    marginBottom: 15,
  },
});
