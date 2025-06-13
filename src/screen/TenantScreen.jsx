import { View, Text, StyleSheet, FlatList, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Colors, Fonts } from '../utils/Theme'
import { OtpInput } from "react-native-otp-entry";
import { moderateScale } from '../utils/Metrics';
export default function TenantScreen() {
  const [countryCode, setCountryCode] = useState('IN')
  const [country, setCountry] = useState(null)
  const [withCallingCode, setWithCallingCode] = useState(`+91`)
  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
    console.log(`+${country?.callingCode[0]}`);

    setWithCallingCode(`+${country?.callingCode[0]}`)
  }
  const [Phonenumber, setPhonenumber] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0);
  const [FinalIndex, setFinalIndex] = useState(0)
  const [OTP, setOTP] = useState('')
  const flatListRef = useRef(null);
  const CreateTenantsSteps = [
    {
      title: 'Enter Mobile Number',
      buttonText: 'continue',
      type: 'phonenumber',
      disbled: !(Phonenumber?.length >= 10)
    }, {
      title: 'OTP',
      buttonText: 'continue',
      type: 'OTP',
      disbled: !(OTP >= 4)
    }
  ]
  const SelfHandle = (index) => {
    flatListRef.current?.scrollToIndex({ index: index, animated: true });
    setCurrentIndex(index);
    setFinalIndex(index)
  }
  const phonenumberfun = async (text) => {
    if (currentIndex < CreateTenantsSteps.length - 1 && text?.length >= 10) {
      const newIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
      setCurrentIndex(newIndex);
      setFinalIndex(newIndex)
    }
    setPhonenumber(text)

  }
  const OTPHandle = (otp) => {
    setOTP(otp)
  }
  return (
    <View style={styles.container}>
      <View
        style={{ margin: moderateScale(20) }}>
        <Text
          style={[
            styles.HeaderText,
            {
              fontSize: moderateScale(22),
              fontWeight: 800,
              fontFamily: Fonts.POPPINS_BOLD,
              color: Colors.WHITE
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
        renderItem={({ item, index }) => {
          return (
            <View style={styles.MainFullWidth}>
              <View style={styles.Box}>
                <Text style={styles.Title}>{item?.title}</Text>
                <View style={styles.PHoneViewHandle}>
                  {
                    item.type == 'phonenumber' &&
                    <>
                      <TextInput
                        placeholder='Enter 10-digit mobile number'
                        style={styles.TextInputPhone}
                        maxLength={10}
                        placeholderTextColor={Colors.WHITE}
                        onChangeText={(text) => phonenumberfun(text)}
                        keyboardType='number-pad'
                        returnKeyType='next'
                        dataDetectorTypes={'phoneNumber'}
                        value={Phonenumber}
                      />
                    </>
                  }
                  {
                    item?.type == 'OTP' &&
                    <OtpInput
                      numberOfDigits={4}
                      placeholder='*'

                      onTextChange={(text) => OTPHandle(text)}
                      theme={{
                        placeholderTextStyle: { color: Colors.WHITE },
                        containerStyle: { marginTop: 50 },
                        pinCodeTextStyle: { color: Colors.WHITE }
                      }}
                    />
                  }
                  <TouchableOpacity onPress={() => SelfHandle(index+1)} disabled={item?.disbled} style={[styles.Button, { backgroundColor: !item.disbled ? Colors.BLUE : Colors.GRAY85 }]}>
                    <Text style={styles.BTNTEXT}>{item?.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  MainFullWidth: {
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(15)
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
    color: Colors.WHITE
  },
  Button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  BTNTEXT: {
    fontSize: 15,
    color: Colors.WHITE,
    fontWeight: '500',
    fontFamily: Fonts.POPPINS_BOLD,

  }
})