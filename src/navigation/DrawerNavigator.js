import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeInLeft, FadeInRight, FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { moderateScale } from '../utils/Metrics';
import { Fonts } from '../utils/Theme';
import { Images } from '../assets/image/image';
const { width, height } = Dimensions.get('window');


export default function DrawerView({ translateX }) {
    // const translateX = useSharedValue(0);
    const [isSelected, setIsSelected] = useState(null);
    const AnimatedCard = Animated.createAnimatedComponent(TouchableOpacity);
    const draweropenstyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value
            }]
        }
    }, [])


    return (
        <>

            <Animated.View style={[styles.container, draweropenstyle]}>
                <AnimatedCard
                    entering={FadeInLeft.duration(500).delay(200)}
                    style={styles.HederCenterStyle}>
                    <Image
                        style={{
                            width: moderateScale(42),
                            height: moderateScale(42),
                            // backgroundColor: '#FFF',
                            borderRadius: moderateScale(8),
                        }}
                        source={Images.SplashScreen}
                    />
                    <View>
                        <Text style={styles.HeaderText}>Sebzy</Text>
                        <Text style={styles.HeaderTextSmall}>PG Management</Text>
                    </View>
                </AnimatedCard>

                <AnimatedCard
                    entering={FadeInLeft.duration(500).delay(200)}
                    style={styles.HederCenterStyle}
                    onPress={() => setIsSelected(true)}
                >
                    <Image
                        style={{
                            width: moderateScale(34),
                            height: moderateScale(34),
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

                <TouchableOpacity >
                    <AnimatedCard
                        entering={FadeInLeft.duration(500).delay(200)}
                        style={styles.SelectedStyle}
                    >

                        <Image
                            style={{
                                width: moderateScale(34),
                                height: moderateScale(34),
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: moderateScale(8),
                            }}
                            source={Images.USER}
                        />
                        <Text style={[styles.HeaderText]}>Dashbord</Text>
                    </AnimatedCard>
                </TouchableOpacity>

                <TouchableOpacity >
                    <AnimatedCard
                        entering={FadeInLeft.duration(500).delay(200)}
                        style={styles.SelectedStyle}
                    >
                        <Image
                            style={{
                                width: moderateScale(32),
                                height: moderateScale(32),
                                padding: moderateScale(12),
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: moderateScale(8),
                            }}
                            source={Images.ROOMTOTAL}
                        />
                        <Text style={[styles.HeaderText]}>Rooms</Text>
                    </AnimatedCard>
                </TouchableOpacity>

                <TouchableOpacity>

                    <AnimatedCard
                        entering={FadeInLeft.duration(500).delay(200)}
                        style={styles.SelectedStyle}
                    >
                        <Image
                            style={{
                                width: moderateScale(34),
                                height: moderateScale(34),
                                padding: moderateScale(16),
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: moderateScale(8),
                            }}
                            source={Images.TENATES}
                        />
                        <Text style={[styles.HeaderText]}>Tenants</Text>
                    </AnimatedCard>
                </TouchableOpacity>

                <TouchableOpacity>
                    <AnimatedCard
                        entering={FadeInLeft.duration(500).delay(200)}
                        style={styles.SelectedStyle}
                    >
                        <Image
                            style={{
                                width: moderateScale(34),
                                height: moderateScale(34),
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: moderateScale(8),
                            }}
                            source={Images.RENT}
                        />
                        <Text style={[styles.HeaderText]}>Rent Management</Text>
                    </AnimatedCard>
                </TouchableOpacity>



            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: '90.8%',
        // backgroundColor: 'blue',
        backgroundColor: '#272C48',
        position: 'absolute',
        bottom: 0,
        zIndex: 500,
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
        padding: moderateScale(16),
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        marginHorizontal: moderateScale(20),
        marginVertical: moderateScale(10),
        borderRadius: moderateScale(16),
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 6.27,
        elevation: 1,
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
        padding: moderateScale(12),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
            <SimpleLineIcons name='menu' size={24} color={'white'}/>
        </TouchableOpacity>
    </View> */}