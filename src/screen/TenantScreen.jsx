import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Colors, Fonts } from '../utils/Theme';
import { OtpInput } from 'react-native-otp-entry';
import { moderateScale, screenWidth } from '../utils/Metrics';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { signInWithPhoneNumber } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebaseconfig';

export default function TenantScreen() {
  const { navigate } = useNavigation();
  const [Phonenumber, setPhonenumber] = useState('');
  const [OTP, setOTP] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [withCallingCode] = useState(`+91`);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const CreateTenantsSteps = [
    {
      title: 'Enter Mobile Number',
      buttonText: 'Continue',
      type: 'phonenumber',
      disbled: !(Phonenumber?.length >= 10),
    },
    {
      title: 'OTP',
      buttonText: 'Verify',
      type: 'OTP',
      disbled: !(OTP?.length === 6),
    },
  ];

  

 const phonenumberfun = async (text) => {
  setPhonenumber(text);
  
  if (text?.length >= 10) {

    try {
    const confirmation = await signInWithPhoneNumber(auth, `+918155980336`);
    setConfirm(confirmation);
    console.log("OTP sent:", confirmation);
  } catch (error) {
    console.error("OTP Send Error:", error);
    Alert.alert("Failed to send OTP", error.message);
  }
  }
};

  const OTPHandle = otp => {
    setOTP(otp);
  };

  const sendOtp = async () => {
    if (Phonenumber.length < 10) {
      Alert.alert('Please enter a valid 10-digit mobile number.');
      return;
    }


  };

  const verifyOtp = async () => {

  };

  // const verifyOtp = async () => {
  //   if (!confirm) {
  //     Alert.alert('OTP not sent yet. Please enter your phone number first.');
  //     return;
  //   }

  //   if (!/^\d{4}$/.test(OTP)) {
  //     Alert.alert('Please enter a valid 4-digit OTP.');
  //     return;
  //   }

  //   try {
  //     await confirm.confirm(OTP);
  //     Alert.alert('Phone number verified successfully!');
  //     navigate('UserImageCapture');
  //   } catch (error) {
  //     console.error('Error verifying OTP:', error.message);
  //     Alert.alert('Error verifying OTP', error.message);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={{ margin: moderateScale(20) }}>
        <Text style={[styles.HeaderText, styles.header]}>Tenants</Text>
      </View>

      <FlatList
        data={CreateTenantsSteps}
        horizontal
        ref={flatListRef}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={styles.MainFullWidth}>
            <View style={styles.Box}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* <TouchableOpacity
                //  onPress={() => navigation.goBack()}
                >
                  <Image
                    style={{
                      width: moderateScale(24),
                      height: moderateScale(24),
                      backgroundColor: '#ccc',
                      borderRadius: moderateScale(20),
                    }}
                    source={require('../assets/image/arrow_left.png')}
                  />
                </TouchableOpacity> */}
                <Text style={[styles.Title, { marginRight: moderateScale(20) }]}>
                  {item?.title}
                </Text>
              </View>
              <View style={styles.PHoneViewHandle}>
                {item.type === 'phonenumber' && (
                  <TextInput
                    placeholder="Enter 10-digit mobile number"
                    style={styles.TextInputPhone}
                    maxLength={10}
                    placeholderTextColor={Colors.WHITE}
                    onChangeText={phonenumberfun}
                    keyboardType="number-pad"
                    value={Phonenumber}
                  />
                )}

                {item.type === 'OTP' && (
                  <View style={{ marginLeft: moderateScale(-8) }}>
                    <OtpInput
                      numberOfDigits={6}
                      placeholder="*"
                      onTextChange={OTPHandle}
                      theme={{
                        placeholderTextStyle: { color: Colors.WHITE },
                        containerStyle: { marginTop: 50 },
                        pinCodeTextStyle: { color: Colors.WHITE },
                      }}
                    />
                  </View>
                )}

                <TouchableOpacity
                  onPress={item.type === 'phonenumber' ? phonenumberfun : verifyOtp}
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
        )}
      />
    </View>
  );
}

// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ActivityIndicator, // Added for loading indicator
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {Colors, Fonts} from '../utils/Theme'; // Make sure these are defined
// import {OtpInput} from 'react-native-otp-entry'; // Make sure this package is installed
// import {moderateScale, screenWidth} from '../utils/Metrics'; // Make sure these are defined
// import {useNavigation} from '@react-navigation/native';
// import auth from '@react-native-firebase/auth'; // Ensure this is imported correctly

// export default function TenantScreen() {
//   const {navigate} = useNavigation();

//   const [Phonenumber, setPhonenumber] = useState('');
//   const [OTP, setOTP] = useState('');
//   const [confirm, setConfirm] = useState(null); // Stores the confirmation result from Firebase
//   const [withCallingCode] = useState(`+91`); // Indian country code
//   const [loading, setLoading] = useState(false); // To show loading state

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef(null);

//   // Define your Firebase Test Phone Numbers and their corresponding OTPs
//   // IMPORTANT: You MUST configure these in your Firebase Console under
//   // Authentication -> Sign-in method -> Phone -> Phone numbers for testing
//   // const firebaseTestNumbers = {
//   //   '+911234567890': '123456', // Example: Phone Number: +911234567890, OTP: 123456
//   //   // Aap yahan aur bhi test numbers add kar sakte hain, provided ki woh Firebase console mein bhi added hon:
//   //   // '+911112223334': '987654',
//   // };

//   const CreateTenantsSteps = [
//     {
//       title: 'Enter Mobile Number',
//       buttonText: 'Continue',
//       type: 'phonenumber',
//       // Enable button only if phone number is 10 digits
//       disabled: !(Phonenumber?.length === 10),
//     },
//     {
//       title: 'OTP',
//       buttonText: 'Verify',
//       type: 'OTP',
//       // Enable button only if OTP is 6 digits
//       disabled: !(OTP?.length === 6),
//     },
//   ];

//   const phonenumberfun = text => {
//     setPhonenumber(text);
//   };

//   const OTPHandle = otp => {
//     setOTP(otp);
//   };

//   // ## Send OTP Function

//   const sendOtp = async () => {
//     if (Phonenumber.length !== 10) {
//       Alert.alert(
//         'Invalid Number',
//         'Please enter a valid 10-digit mobile number.',
//       );
//       return;
//     }

//     const fullPhoneNumber = `${withCallingCode}${Phonenumber}`;

//     setLoading(true);
//     try {
//       // Ab seedha real phone number par OTP send hoga
//       const confirmationResult = await auth().signInWithPhoneNumber(
//         fullPhoneNumber,
//       );
//       setConfirm(confirmationResult); // Store the confirmation object

//       Alert.alert('OTP Sent!', `OTP has been sent to ${fullPhoneNumber}.`);

//       // Next step (OTP input) pe move karein
//       const newIndex = currentIndex + 1;
//       flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
//       setCurrentIndex(newIndex);
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       let errorMessage = 'Failed to send OTP. Please try again.';
//       if (error.code === 'auth/too-many-requests') {
//         errorMessage = 'Too many requests. Please try again later.';
//       } else if (error.code === 'auth/invalid-phone-number') {
//         errorMessage = 'Invalid phone number format.';
//       } else if (
//         error.message.includes('quota') ||
//         error.message.includes('BILLING_NOT_ENABLED')
//       ) {
//         // This error will now be seen more frequently if you are still on Spark plan
//         errorMessage =
//           'SMS quota exceeded for this project. Please upgrade to Blaze plan if you need more OTPs, or wait until tomorrow.';
//       }
//       Alert.alert('OTP Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ## Verify OTP Function

//   const verifyOtp = async () => {
//     if (!confirm) {
//       Alert.alert(
//         'Verification Error',
//         'OTP not sent yet. Please enter your phone number first.',
//       );
//       return;
//     }

//     if (OTP.length !== 6) {
//       // Firebase OTPs are typically 6 digits
//       Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await confirm.confirm(OTP);
//       Alert.alert('Success!', 'Phone number verified successfully!');
//       // Navigate to the next screen after successful verification
//       navigate('UserImageCapture');
//     } catch (error) {
//       console.error('Error verifying OTP:', error.message);
//       let errorMessage = 'Failed to verify OTP. Please try again.';
//       if (error.code === 'auth/invalid-verification-code') {
//         errorMessage = 'Invalid OTP. Please check the code and try again.';
//       } else if (error.code === 'auth/code-expired') {
//         errorMessage = 'OTP has expired. Please resend a new OTP.';
//       } else if (error.code === 'auth/too-many-requests') {
//         errorMessage =
//           'Too many verification attempts. Please try again later.';
//       }
//       Alert.alert('Verification Failed', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- UI Rendering ---
//   return (
//     <View style={styles.container}>
//       {loading && ( // Loading indicator overlay
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color={Colors.BLUE} />
//         </View>
//       )}
//       <View style={{margin: moderateScale(20)}}>
//         <Text style={[styles.HeaderText, styles.header]}>Tenants</Text>
//       </View>

//       <FlatList
//         data={CreateTenantsSteps}
//         horizontal
//         ref={flatListRef}
//         scrollEnabled={false} // Disable manual scrolling
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled // For smooth step transitions
//         renderItem={({item}) => (
//           <View style={styles.MainFullWidth}>
//             <View style={styles.Box}>
//               <View
//                 style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//                 {currentIndex > 0 && ( // Show back button only on OTP screen
//                   <TouchableOpacity
//                     onPress={() => {
//                       const newIndex = currentIndex - 1;
//                       flatListRef.current?.scrollToIndex({
//                         index: newIndex,
//                         animated: true,
//                       });
//                       setCurrentIndex(newIndex);
//                     }}>
//                     <Image
//                       style={{
//                         width: moderateScale(24),
//                         height: moderateScale(24),
//                         backgroundColor: '#ccc',
//                         borderRadius: moderateScale(20),
//                       }}
//                       source={require('../assets/image/arrow_left.png')} // Make sure this path is correct
//                     />
//                   </TouchableOpacity>
//                 )}
//                 {/* Agar current index 0 hai (phone number screen), to title ko left mein align karna padega
//                     ya center ke liye marginLeft adjust karna padega kyunki back button nahi hai. */}
//                 <Text
//                   style={[
//                     styles.Title,
//                     {
//                       marginRight: moderateScale(20),
//                       marginLeft: currentIndex === 0 ? 0 : moderateScale(20),
//                     },
//                   ]}>
//                   {item?.title}
//                 </Text>
//               </View>

//               <View style={styles.PHoneViewHandle}>
//                 {item.type === 'phonenumber' && (
//                   <TextInput
//                     placeholder="Enter 10-digit mobile number"
//                     style={styles.TextInputPhone}
//                     maxLength={10}
//                     placeholderTextColor={Colors.WHITE}
//                     onChangeText={phonenumberfun}
//                     keyboardType="number-pad"
//                     value={Phonenumber}
//                   />
//                 )}

//                 {item.type === 'OTP' && (
//                   <View style={{marginLeft: moderateScale(-8)}}>
//                     <OtpInput
//                       numberOfDigits={6} // Firebase OTPs are typically 6 digits
//                       placeholder="*"
//                       onTextChange={OTPHandle}
//                       theme={{
//                         placeholderTextStyle: {color: Colors.WHITE},
//                         containerStyle: {marginTop: moderateScale(50)},
//                         pinCodeTextStyle: {color: Colors.WHITE},
//                         pinCodeContainerStyle: {
//                           // Style for individual OTP boxes
//                           borderColor: Colors.WHITE,
//                           borderWidth: 1,
//                           borderRadius: moderateScale(5),
//                           height: moderateScale(45), // Adjust size if needed
//                           width: moderateScale(45),
//                           marginHorizontal: moderateScale(2),
//                         },
//                       }}
//                       // Optionally, aap yahan test OTP ko prefill kar sakte hain for quick testing
//                       // defaultValue={Phonenumber && firebaseTestNumbers[`+91${Phonenumber}`] ? firebaseTestNumbers[`+91${Phonenumber}`] : ''}
//                     />
//                   </View>
//                 )}

//                 <TouchableOpacity
//                   onPress={item.type === 'phonenumber' ? sendOtp : verifyOtp}
//                   disabled={item?.disabled || loading} // Disable button when loading or if inputs are invalid
//                   style={[
//                     styles.Button,
//                     {
//                       backgroundColor:
//                         !item.disabled && !loading
//                           ? Colors.BLUE
//                           : Colors.GRAY85,
//                     },
//                   ]}>
//                   {loading ? (
//                     <ActivityIndicator color={Colors.WHITE} />
//                   ) : (
//                     <Text style={styles.BTNTEXT}>{item?.buttonText}</Text>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.WHITE,
  },
  MainFullWidth: {
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(15),
  },
  Box: {
    width: screenWidth * 0.8,
    alignSelf: 'center',
    backgroundColor: '#121826',
    borderRadius: moderateScale(8),
    padding: moderateScale(20),
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
});
