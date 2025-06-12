import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  FadeInLeft,
  FadeInUp,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {moderateScale, screenHeight, screenWidth} from '../utils/Metrics';
import {Colors, Fonts} from '../utils/Theme';
import CustomButton from '../component/CustomButton';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {Images} from '../assets/image/image';
import FilePickerManager from 'react-native-file-picker';
import DatePicker from 'react-native-date-picker';
import Header from '../component/Header';
import DrawerView from '../navigation/DrawerNavigator';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const TenantScreen = () => {
  const AnimatedCard = Animated.createAnimatedComponent(TouchableOpacity);
  const [MyWidth, setMyWidth] = useState(Dimensions.get('window').width);
  const translateX = useSharedValue(-Dimensions.get('window').width * 0.8); // start hidden
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalRoom, setModalRoom] = useState(false);
  const [modalOTP, setModalOTP] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const onChange = ({window}) => {
      setMyWidth(window.width);
      console.log('window', window.width);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription?.remove();
  }, []);

  const data = [
    {label: 'All Tenants', value: '1'},
    {label: 'Active', value: '2'},
    {label: 'Inactive', value: '3'},
    {label: 'All Tenants2', value: '4'},
    {label: 'Active2', value: '5'},
    {label: 'Inactive2', value: '6'},
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

  const showFilePicker = () => {
    FilePickerManager.showFilePicker(null, response => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else {
        console.log('Picked file: ', response);
        setFile(response);
      }
    });
  };

  const formattedDate = date.toLocaleDateString('en-GB', {
    // weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
              fun={() => setIsModalVisible(false)}
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
                keyboardType="email-address"
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
                keyboardType="phone-pad"
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
            {/* <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TIDPROOF} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> ID Proof Type</Text>
              </View>

              <TextInput // yaha pe input box hata ke dropdown rakhna hai
                placeholder="Select Proof type"
                style={styles.inputmodal}
              />
            </View> */}
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TIDPROOF} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> Select ID Proof</Text>
              </View>

              <TouchableOpacity
                onPress={showFilePicker}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  padding: moderateScale(12),
                  borderRadius: 8,
                  marginBottom: 15,
                }}>
                {file ? (
                  <Text style={{color: '#fff'}} numberOfLines={1}>
                    {file.fileName}
                  </Text>
                ) : (
                  <Text style={{color: 'gray'}}> Select Proof</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TROOM} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> Room</Text>
              </View>

              <TouchableOpacity
                onPress={() => setModalRoom(true)}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  padding: moderateScale(12),
                  borderRadius: 8,
                  marginBottom: 15,
                }}>
                {selectedRoom ? (
                  <Text style={{color: '#fff'}}>{selectedRoom}</Text>
                ) : (
                  <Text style={{color: 'gray'}}>Select Room</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.TCALENDER} style={styles.imageMOdal} />
                <Text style={styles.TextHeaderModal}> Joining Date</Text>
              </View>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  padding: moderateScale(12),
                  borderRadius: 8,
                  marginBottom: 15,
                }}>
                <Text style={{color: 'gray', fontWeight: 600}}>
                  Date: {formattedDate}
                </Text>

                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  minimumDate={new Date()}
                  onConfirm={selectedDate => {
                    setOpen(false);
                    setDate(selectedDate);
                  }}
                  onCancel={() => setOpen(false)}
                  theme="dark" // or "light"
                  textColor="#000"
                  androidVariant="nativeAndroid"
                />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              {/* <Image
                source={Images.TUSER}
                style={{width: moderateScale(22), height: moderateScale(22)}}
                /> */}
              <CustomButton
                text={'Add Tenant'}
                Bg={Colors.BLUE}
                fun={() => AddTenantsData()}
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  const AddTenantsData = () => {
    setModalOTP(true);
    setIsModalVisible(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedRoom(item.label);
        setModalRoom(false);
      }}>
      <Text style={styles.itemText}>{item.label}</Text>
      {selectedRoom === item.label && (
        <View style={styles.selectedCircle}>
          <View style={styles.selectedInnerCircle} />
        </View>
      )}
    </TouchableOpacity>
  );

  const DrawerHandle = () => {
    const isOpen = translateX.value === 0;
    translateX.value = withTiming(isOpen ? -MyWidth * 0.8 : 0, {duration: 500});
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header functions={() => DrawerHandle()} /> */}
      {/* {currentscreen == 'Dashboard' ? ( */}
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
                  fontSize: moderateScale(16),
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
            <Text
              style={[styles.TextToSmall, {marginBottom: moderateScale(10)}]}>
              No tenants found. Add your tenant to get started.
            </Text>
            <View style={styles.IconAndTitle}>
              <CustomButton
                text={'+ Add Tenants'}
                Bg={Colors.BLUE}
                fun={() => setIsModalVisible(true)}
              />
            </View>
          </AnimatedCard>
        </>
      )}
      {/*  ) : currentscreen == 'Rooms' ? (  <RoomsScreen />
       ) : currentscreen == 'Tenants' ? ( <TenantScreen />
       ) : (  currentscreen == 'Rent Management' && <RentManagement />
       )} */}
      <Modal
        transparent
        animationType="fade"
        visible={modalRoom}
        onRequestClose={() => setModalRoom(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.dropdownBox}>
            <Text style={styles.label}>Select a room</Text>

            <FlatList
              data={data}
              keyExtractor={item => item.value.toString()}
              renderItem={renderItem}
              style={{maxHeight: 300}}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalRoom(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        animationType="fade"
        visible={modalOTP}
        onRequestClose={() => setModalOTP(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.dropdownBox}>
            <Text style={styles.label}>Select a room</Text>
            {/* <OTPInputView
              style={{width: '80%', height: 200}}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            /> */}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalOTP(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <DrawerView */}
      {/* // translateX={translateX}
      // currentscreen={currentscreen}
      // setCurrentScreen={setCurrentScreen} */}
      {/* /> */}
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
  closeButton: {
    backgroundColor: Colors.REDB,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownBox: {
    backgroundColor: '#2e2f33',
    borderRadius: 25,
    padding: 20,
    width: '90%',
  },
  label: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 15,
  },
  item: {
    padding: 15,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#00BFFF',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeText: {
    color: '#00BFFF',
    fontSize: 16,
  },

  // otp
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
