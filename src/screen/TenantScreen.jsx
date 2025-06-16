import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors, Fonts} from '../utils/Theme';
import {OtpInput} from 'react-native-otp-entry';
import {moderateScale} from '../utils/Metrics';
import {useNavigation} from '@react-navigation/native';
// import CountryPicker from 'react-native-country-picker-modal';

export default function TenantScreen() {
  const {navigate} = useNavigation();
  const [countryCode, setCountryCode] = useState('IN');
  const [country, setCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility
  const [withCallingCode, setWithCallingCode] = useState(`+91`);

  const [Phonenumber, setPhonenumber] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [FinalIndex, setFinalIndex] = useState(0);
  const [OTP, setOTP] = useState('');
  const flatListRef = useRef(null);
  const CreateTenantsSteps = [
    {
      title: 'Enter Mobile Number',
      buttonText: 'continue',
      type: 'phonenumber',
      disbled: !(Phonenumber?.length >= 10),
    },
    {
      title: 'OTP',
      buttonText: 'continue',
      type: 'OTP',
      disbled: !(OTP >= 4),
    },
  ];
  const SelfHandle = index => {
    flatListRef.current?.scrollToIndex({index: index, animated: true});
    setCurrentIndex(index);
    setFinalIndex(index);
  };
  const onSelect = selectedCountry => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setModalVisible(false); // Close modal after selection
    console.log('Selected Country:', selectedCountry);
  };
  const phonenumberfun = async text => {
    if (currentIndex < CreateTenantsSteps.length - 1 && text?.length >= 10) {
      const newIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
      setCurrentIndex(newIndex);
      setFinalIndex(newIndex);
    }
    setPhonenumber(text);
  };
  const OTPHandle = otp => {
    setOTP(otp);
  };
  return (
    <View style={styles.container}>
      <View style={{margin: moderateScale(20)}}>
        <Text
          style={[
            styles.HeaderText,
            {
              fontSize: moderateScale(22),
              fontWeight: 800,
              fontFamily: Fonts.POPPINS_BOLD,
              color: Colors.WHITE,
            },
          ]}>
          Tenants
        </Text>
      </View>
      <FlatList
        data={CreateTenantsSteps}
        horizontal
        ref={flatListRef}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item, index}) => {
          return (
            <View style={styles.MainFullWidth}>
              <View style={styles.Box}>
                <Text style={styles.Title}>{item?.title}</Text>
                <View style={styles.PHoneViewHandle}>
                  {item.type == 'phonenumber' && (
                    <View
                      style={{flexDirection: 'row', gap: moderateScale(10)}}>
                      {/* <CountryPicker
                        // Props for the picker's behavior
                        withFilter={true} // Allow searching
                        withCallingCode={true} // Include calling code in selected data
                        onSelect={onSelect} // Handle country selection
                        countryCode={countryCode} // Controlled component: display current selected country
                        visible={modalVisible} // Control modal visibility
                        onClose={() => setModalVisible(false)} // Close modal when backdrop is pressed
                        // Props for customizing the flag button
                        withFlag={true} // Ensure flags are enabled
                        withEmoji={false} // Crucial: use image flags instead of emojis for proper rounding
                        renderFlagButton={renderCustomFlagButton} // Use our custom flag button component
                        // Hide the default button if using renderFlagButton
                        withCountryNameButton={false}
                      />
                      {country && (
                        <View style={styles.selectedCountryInfo}>
                          <Text style={styles.infoText}>
                            Selected Country: {country.name} ({country.cca2})
                          </Text>
                          <Text style={styles.infoText}>
                            Calling Code: +{country.callingCode[0]}
                          </Text>
                        </View>
                      )} */}
                      <TextInput
                        placeholder="Enter 10-digit mobile number"
                        style={styles.TextInputPhone}
                        maxLength={10}
                        placeholderTextColor={Colors.WHITE}
                        onChangeText={text => phonenumberfun(text)}
                        keyboardType="number-pad"
                        returnKeyType="next"
                        dataDetectorTypes={'phoneNumber'}
                        value={Phonenumber}
                      />
                    </View>
                  )}
                  {item?.type == 'OTP' && (
                    <OtpInput
                      numberOfDigits={4}
                      placeholder="*"
                      onTextChange={text => OTPHandle(text)}
                      theme={{
                        placeholderTextStyle: {color: Colors.WHITE},
                        containerStyle: {marginTop: 50},
                        pinCodeTextStyle: {color: Colors.WHITE},
                      }}
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => navigate('UserImageCapture')}
                    disabled={item?.disbled}
                    style={[
                      styles.Button,
                      {
                        backgroundColor: !item.disbled
                          ? Colors.BLUE
                          : Colors.GRAY85,
                      },
                    ]}>
                    <Text style={styles.BTNTEXT}>{item?.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

// const renderCustomFlagButton = props => {
//   // const flagUri = `https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/${props.countryCode.toLowerCase()}.png`;

//   const flagSource = {
//     uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/${countryCode.toLowerCase()}.png`,
//   };

//   return (
//     <TouchableOpacity
//       onPress={() => setModalVisible(true)} // Open the picker modal
//       style={styles.flagButtonContainer}>
//       <View style={styles.roundFlagWrapper}>
//         <Image
//           source={{uri: flagUri}}
//           style={styles.flagImage}
//           onError={() =>
//             console.log('Error loading flag for:', props.countryCode)
//           }
//         />
//       </View>
//       {/* Optional: Display country name or calling code next to the flag */}
//       {country && (
//         <Text style={styles.buttonText}>
//           {country.name} (+{country.callingCode[0]})
//         </Text>
//       )}
//     </TouchableOpacity>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  MainFullWidth: {
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(15),
  },
  Box: {
    width: '80%',
    marginHorizontal: 'auto',
    // height: heightPercentageToDP(40),
    backgroundColor: '#121826',
    borderRadius: moderateScale(8),
    padding: 25,
  },
  Title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  PHoneViewHandle: {
    gap: 50,
  },
  TextInputPhone: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.WHITE,
    borderRadius: 7,
    padding: 10,
    marginTop: 20,
    color: Colors.WHITE,
  },
  Button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  BTNTEXT: {
    fontSize: 15,
    color: Colors.WHITE,
    fontWeight: '500',
    fontFamily: Fonts.POPPINS_BOLD,
  },
  flagContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, // Half of width/height
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
