import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInLeft, FadeInRight, FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { moderateScale, screenHeight, screenWidth } from '../utils/Metrics';
import { Colors, Fonts } from '../utils/Theme';
import { Images } from '../assets/image/image';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function DrawerView({
    translateX,
    currentscreen,
    setCurrentScreen
}) {
    const AnimatedCard = Animated.createAnimatedComponent(TouchableOpacity);
    const [MyWidth, setMyWidth] = useState(Dimensions.get('window').width);
    const translateY = useSharedValue(0);
    const isOpen = translateX.value === 0
    const { navigate } = useNavigation();
    const AnimatedLinear = Animated.createAnimatedComponent(LinearGradient)
    const [Toogle, setToggle] = useState(0);
    const draweropenstyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value
            }]
        }
    }, [])

    const navigateAnimation = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: translateY.value
            }]
        }
    }, [])

    useEffect(() => {
        const NavigateAnimation = () => {
            switch (currentscreen) {
                case 'Dashboard':
                    translateY.value = withTiming(hp('21%'), { duration: 300 });
                    break;
                case 'Rooms':
                    translateY.value = withTiming(hp('28.3%'), { duration: 300 });
                    break;
                case 'Tenants':
                    translateY.value = withTiming(hp('37.5%'), { duration: 300 });
                    break;
                case 'TenantScreen':
                    translateY.value = withTiming(hp('40%'), { duration: 300 });
                    break;
                case 'Rent Management':
                    translateY.value = withTiming(hp('47%'), { duration: 300 });
                    break;
                default:
                    translateY.value = withTiming(hp('20.5%'), { duration: 300 });
            }
            // navigate(currentscreen);

            Toogle > 0 && (
                translateX.value = withTiming(isOpen ? -MyWidth * 0.8 : 0, { duration: 500 })
            )
            setToggle(pre => pre + 1);
        };
        NavigateAnimation();
    }, [currentscreen])


    const NavigationNextScreen = (screen) => {
        setCurrentScreen(screen);
    }
    return (
        < >

            <Animated.View style={[styles.container, draweropenstyle]}>
                <View
                >
                    <AnimatedCard
                        entering={FadeInLeft.duration(500).delay(200)}
                        style={styles.HederCenterStyle}
                    >
                        <Image
                            style={{
                                width: moderateScale(42),
                                height: moderateScale(42),
                                borderRadius: moderateScale(8),
                            }}
                            source={Images.SplashScreen}
                        />
                        <View>
                            <Text style={styles.HeaderText}>Sebzy</Text>
                            <Text style={styles.HeaderTextSmall}>PG Management</Text>
                        </View>
                        <TouchableOpacity style={{ marginLeft: moderateScale(10), }} onPress={

                            () => translateX.value = withTiming(isOpen ? -MyWidth * 0.8 : 0, { duration: 500 })}>
                            <Image
                                style={{
                                    width: moderateScale(24),
                                    height: moderateScale(24),
                                    tintColor: '#fff',
                                }}
                                source={Images.close}
                            />
                        </TouchableOpacity>
                    </AnimatedCard>
                </View>


                <AnimatedCard
                    entering={FadeInLeft.duration(500).delay(200)}
                    style={styles.HederCenterStyle} >
                    <Image
                        style={{
                            width: moderateScale(36),
                            height: moderateScale(36),
                            backgroundColor: '#FFF',
                            borderRadius: moderateScale(30),
                        }}
                        source={Images.USER}
                    />
                    <View style={{ marginLeft: moderateScale(8) }}>
                        <Text style={[styles.HeaderText]}>Johan</Text>
                        <Text style={styles.HeaderTextSmall}>India</Text>
                    </View>
                </AnimatedCard>

                <View style={{
                    width: '90%',
                    height: 60,
                    alignSelf: 'center',
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderLeftWidth: currentscreen == 'Dashboard' ? 5 : 0,
                    borderColor: currentscreen == 'Dashboard' ? Colors.WHITE : ""
                }}>
                    {
                        currentscreen == 'Dashboard' &&
                        <View style={{ flex: 1, backgroundColor: '#6366f1cc' }} />

                    }

                    <View style={{
                        ...StyleSheet.absoluteFillObject,
                        justifyContent: 'center',
                        // alignItems: 'center',
                    }}>

                        <AnimatedCard
                            onPress={() => NavigationNextScreen('Dashboard')}
                            entering={FadeInLeft.duration(500).delay(200)}
                            style={[styles.SelectedStyle,]}
                        >
                            <Image
                                style={{
                                    width: moderateScale(40),
                                    height: moderateScale(40),
                                    tintColor: '#fff'
                                }}
                                source={Images.USER}
                            />

                            <Text style={[styles.HeaderText]}>Dashbord</Text>
                        </AnimatedCard>
                    </View>
                </View>

                <View style={{
                    width: '90%',
                    height: 60,
                    alignSelf: 'center',
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderLeftWidth: currentscreen == 'Rooms' ? 5 : 0,
                    borderColor: currentscreen == 'Rooms' ? Colors.WHITE : ""
                }}>
                    {
                        currentscreen == 'Rooms' &&
                        <View style={{ flex: 1, backgroundColor: '#6366f1cc' }} />

                    }
                    {/* <View style={{ flex: 1, backgroundColor: '#4f46e5cc' }} /> */}

                    <View style={{
                        ...StyleSheet.absoluteFillObject,
                        justifyContent: 'center',
                        // alignItems: 'center',
                    }}>
                        {/* Your AnimatedCard */}
                        <AnimatedCard
                            onPress={() => NavigationNextScreen('Rooms')}
                            entering={FadeInLeft.duration(500).delay(200)}
                            style={styles.SelectedStyle}
                        >
                            <View
                                style={{
                                    width: moderateScale(40),
                                    height: moderateScale(40),
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: moderateScale(12),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: moderateScale(10),
                                }}
                            >
                                <Image
                                    style={{
                                        width: moderateScale(26),
                                        height: moderateScale(26),
                                        tintColor: '#fff'
                                    }}
                                    source={Images.ROOMTOTAL}
                                />
                            </View>
                            <Text style={[styles.HeaderText]}>Rooms</Text>
                        </AnimatedCard>
                    </View>
                </View>

                <View style={{
                    width: '90%',
                    height: 60,
                    alignSelf: 'center',
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderLeftWidth: currentscreen == 'Tenants' ? 5 : 0,
                    borderColor: currentscreen == 'Tenants' ? Colors.WHITE : ""
                }}>
                    {
                        currentscreen == 'Tenants' &&
                        <View style={{ flex: 1, backgroundColor: '#6366f1cc' }} />

                    }


                    <View style={{
                        ...StyleSheet.absoluteFillObject,
                        justifyContent: 'center',

                    }}>

                        <AnimatedCard
                            onPress={() => NavigationNextScreen('Tenants')}
                            entering={FadeInLeft.duration(500).delay(200)}
                            style={styles.SelectedStyle}
                        >
                            <View
                                style={{
                                    width: moderateScale(40),
                                    height: moderateScale(40),
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: moderateScale(12),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: moderateScale(10),
                                }}
                            >
                                <Image
                                    style={{
                                        width: moderateScale(26),
                                        height: moderateScale(26),
                                    }}
                                    source={Images.TENATES}
                                /></View>
                            <Text style={[styles.HeaderText]}>Tenants</Text>
                        </AnimatedCard>
                        {/* Your AnimatedCard */}
                    </View>
                </View>



                <View style={{
                    width: '90%',
                    height: 60,
                    alignSelf: 'center',
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderLeftWidth: currentscreen == 'Rent Management' ? 5 : 0,
                    borderColor: currentscreen == 'Rent Management' ? Colors.WHITE : ""
                }}>
                    {
                        currentscreen == 'Rent Management' &&
                        <View style={{ flex: 1, backgroundColor: '#6366f1cc' }} />

                    }

                    <View style={{
                        ...StyleSheet.absoluteFillObject,
                        justifyContent: 'center',
                        // alignItems: 'center',
                    }}>
                        {/* Your AnimatedCard */}
                        <AnimatedCard
                            onPress={() => NavigationNextScreen('Rent Management')}
                            entering={FadeInLeft.duration(500).delay(200)}
                            style={styles.SelectedStyle}
                        >
                            <View
                                style={{
                                    width: moderateScale(40),
                                    height: moderateScale(40),
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: moderateScale(12),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: moderateScale(10),
                                }}
                            >
                                <Image
                                    style={{
                                        width: moderateScale(26),
                                        height: moderateScale(26),
                                        tintColor: '#fff'
                                    }}
                                    source={Images.RENT}
                                /></View>
                            <Text style={[styles.HeaderText]}>Rent Management</Text>
                        </AnimatedCard>
                    </View>
                </View>
            </Animated.View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.8,
        height: heightPercentageToDP(87),
        backgroundColor: '#272C48',
        position: 'absolute',
        bottom: 0,
        zIndex: 500,
    },
    gradientBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
    },
    header: {
        width: '100%',
        height: '10%',
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    HederCenterStyle: {
        width: "90%",
        height: 60,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
        padding: moderateScale(2),
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        alignSelf: 'center',
        marginVertical: moderateScale(10),
        borderRadius: moderateScale(16),
        borderWidth: 1,
        borderColor: '#ffffff0d'
        // shadowOffset: {
        //     width: 0,
        //     height: 0,
        // },
        // shadowOpacity: 0.17,
        // shadowRadius:1.27,
        // elevation: 1,
    },
    HeaderText: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: '#FFF',
        fontWeight: 700,
        zIndex: 1
    },
    HeaderTextSmall: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: '#A1AFF6',
    },
    SelectedStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
        // padding: moderateScale(10),
        // backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: moderateScale(20),
        marginVertical: moderateScale(10),
        borderRadius: moderateScale(16),
        opacity: moderateScale(0.3)
    },

})






// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Colors } from '../utils/Theme'

// const DrawerNavigator = () => {


//     const [MyWidth, setMyWidth] = useState(Dimensions.get('window').width);

//     return (
//         <SafeAreaView style={styles.container}>
//             <Text>DrawerNavigator</Text>
//             <Text>DrawerNavigator</Text>
//             <Text>DrawerNavigator</Text>
//         </SafeAreaView>
//     )
// }

// export default DrawerNavigator

// const styles = StyleSheet.create({
//     container: {

//         backgroundColor: Colors.GUNMETAL,
//     },
// })


{/* <View style={styles.header}>
        <TouchableOpacity onPress={DrawerHandle}>
            <SimpleLineIcons name='menu' size={26} color={'white'}/>
        </TouchableOpacity>
    </View> */}