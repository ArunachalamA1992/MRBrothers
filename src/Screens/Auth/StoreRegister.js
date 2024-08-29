//import liraries
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    SafeAreaView,
    ImageBackground,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { ToastAndroid } from 'react-native';

// create a component
const StoreRegister = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState('');
    const [pincode, setPincode] = useState('');
    const [buildingName, setBuildingName] = useState('');
    const [street, setStreet] = useState('');
    const [name, setName] = useState('');
    const [gst, setGst] = useState('');
    const [error, setError] = useState(false);


    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');

    const isMobile = input => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(input);
    };

    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (val.length === 0) {
            setEmailValidError('Email address must be enter');
        } else if (reg.test(val) === false) {
            setEmailValidError('Enter valid email address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    };

    const chkNumber = number => {
        setNumber(number);
        if (number.length == 10) {
            Keyboard.dismiss();
        }
    };

    const chkNumberError = number => {
        let reg = /^[6-9][0-9]*$/;

        if (number.length === 0) {
            setError('Please enter your mobile number');
        } else if (reg.test(number) === false) {
            setError(false);
            setError(false);
        } else if (reg.test(number) === true) {
            setError('');
        }
    };


    const registerClick = async () => {
        try {
            setLoading(true);
            const numberIsMobile = isMobile(number);
            if (name != '' && email != '' && number != '') {
                ToastAndroid.show("Login Success! Welcome to MR Brothers", ToastAndroid.SHORT)
                navigation.navigate("StoreRegister")
                // var data = {
                //     mobile: number
                // };
                // const login_data = await fetchData.login_with_otp(data, null);
                // if (login_data?.status) {
                //     ToastAndroid.show(login_data?.message, ToastAndroid.SHORT)
                //     navigation.dispatch(
                //         StackActions.replace('OTPScreen', {
                //             number,
                //             token: login_data?.token,
                //             loginType,
                //         }),
                //     );
                //     setLoading(false);
                // } else {
                //     var msg = login_data?.message;
                //     setError(msg);
                //     setLoading(false);
                // }
                setLoading(false);
            } else {
                ToastAndroid.show("Please select all the mandatory fields", ToastAndroid.SHORT)
            }
        } catch (error) {
            console.log("catch in login_Verify :", error);

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 0, width: '100%', height: 180, justifyContent: 'center', alignItems: 'center', opacity: 0.6, backgroundColor: Color.white }}>
                <ImageBackground
                    source={require('../../assets/Images/verify.jpg')}
                    style={styles.image}
                />
            </View>
            <View style={{ flex: 2, top: 150, position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '95%', padding: 10, marginTop: 20, }}>
                    <Text style={{ textAlign: 'left', fontSize: 26, color: Color.black, fontFamily: Manrope.Bold, }}>Introduce Your Store</Text>
                    <Text style={{ textAlign: 'left', fontSize: 15, color: Color.cloudyGrey, fontFamily: Manrope.Medium, paddingVertical: 5 }}>Present Your Shop to MR Brothers</Text>
                </View>
                <View style={{ width: '95%', padding: 10, }}>
                    <View style={{ marginVertical: 0 }}>
                        <View style={styles.NumberBoxConatiner}>

                            <TextInput
                                placeholder={'Enter your shop name'}
                                placeholderTextColor={Color.cloudyGrey}
                                value={name}
                                maxLength={10}
                                autoFocus={false}
                                keyboardType='name-phone-pad'
                                onChangeText={input => {
                                    setName(input);
                                }}
                                style={styles.numberTextBox}
                            />
                            <View style={styles.numberCountryCode}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'user'}
                                    icon_size={20}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <View style={styles.NumberBoxConatiner}>
                            <TextInput
                                style={styles.numberTextBox}
                                placeholder="Enter your GST number"
                                placeholderTextColor={Color.cloudyGrey}
                                value={gst}
                                onChangeText={value => {
                                    setGst(value);
                                }}
                                keyboardType="name-phone-pad"
                            />
                            <View style={styles.numberCountryCode}>
                                <Image
                                    source={require('../../assets/Images/gst.png')}
                                    style={{ width: 28, height: 28, resizeMode: 'contain', marginTop: 5 }}
                                />
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontSize: 18, color: Color.lightBlack, fontFamily: Manrope.SemiBold, }}>Enter your shop address</Text>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.NumberBoxConatiner}>
                            <TextInput
                                placeholder={'Building Name'}
                                placeholderTextColor={Color.cloudyGrey}
                                value={buildingName}
                                maxLength={10}
                                autoFocus={false}
                                keyboardType='name-phone-pad'
                                onChangeText={input => {
                                    setBuildingName(input);
                                }}
                                style={styles.numberTextBox}
                            />
                            <View style={styles.numberCountryCode}>
                                <Iconviewcomponent
                                    Icontag={'FontAwesome'}
                                    iconname={'building-o'}
                                    icon_size={20}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.NumberBoxConatiner}>
                            <TextInput
                                placeholder={'Street Name / Area'}
                                placeholderTextColor={Color.cloudyGrey}
                                value={street}
                                maxLength={10}
                                autoFocus={false}
                                keyboardType='name-phone-pad'
                                onChangeText={input => {
                                    setStreet(input);
                                }}
                                style={styles.numberTextBox}
                            />
                            <View style={styles.numberCountryCode}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'map-pin'}
                                    icon_size={20}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flex: 1, borderWidth: 0.5, paddingVertical: 10, borderRadius: 5, borderColor: Color.cloudyGrey, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <Image
                                    source={require('../../assets/Images/flag.png')}
                                    style={{ width: 30, height: 30, resizeMode: 'contain', marginTop: 5 }}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: Color.cloudyGrey, fontFamily: Manrope.SemiBold, paddingHorizontal: 10 }}>India</Text>
                        </View>
                        <View style={{ width: 10, height: 'auto', backgroundColor: Color.white }}></View>
                        <TouchableOpacity style={{ flex: 1, borderWidth: 0.5, paddingVertical: 15, borderRadius: 5, borderColor: Color.cloudyGrey, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: Color.cloudyGrey, fontFamily: Manrope.SemiBold, paddingHorizontal: 10 }}>State</Text>
                            <View style={{ paddingHorizontal: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'chevron-small-down'}
                                    icon_size={20}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <TouchableOpacity style={{ flex: 1, borderWidth: 0.5, paddingVertical: 15, borderRadius: 5, borderColor: Color.cloudyGrey, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: Color.cloudyGrey, fontFamily: Manrope.SemiBold, paddingHorizontal: 10 }}>City</Text>
                            <View style={{ paddingHorizontal: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'chevron-small-down'}
                                    icon_size={20}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 10, height: 'auto', backgroundColor: Color.white }}></View>
                        <View style={{ flex: 1, borderWidth: 0.5, borderRadius: 5, borderColor: Color.cloudyGrey, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextInput
                                placeholder={'Pincode'}
                                placeholderTextColor={Color.cloudyGrey}
                                value={pincode}
                                maxLength={6}
                                autoFocus={false}
                                keyboardType='number-pad'
                                onChangeText={input => {
                                    setPincode(input);
                                }}
                                style={{
                                    width: '100%',
                                    height: 55,
                                    borderLeftColor: Color.Venus,
                                    borderLeftWidth: 1,
                                    color: Color.black,
                                    fontSize: 14,
                                    padding: 5,
                                    paddingTop: 5,
                                    paddingHorizontal: 10,
                                    fontFamily: Manrope.SemiBold,
                                    alignItems: 'flex-start',
                                }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => {
                        ToastAndroid.show("Login Success! Welcome to MR Brothers", ToastAndroid.SHORT),
                        navigation.navigate("Login")
                    }}
                        style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 20,
                            backgroundColor: Color.primary,
                            borderColor: Color.primary,
                            borderWidth: 0.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}>
                        <Text style={{ fontSize: 16, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Sgn Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.white,
    },
    image: {
        width: scr_width,
        height: scr_height,
        resizeMode: 'contain',
    },
    NumberBoxConatiner: {
        borderColor: Color.cloudyGrey,
        borderWidth: 1,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    numberCountryCode: {
        color: Color.black,
        marginHorizontal: 10,
        fontSize: 16,
        fontFamily: Manrope.SemiBold,
        textAlign: 'center',
        alignItems: 'center',
        padding: 5,
        paddingTop: 5,
        paddingHorizontal: 5,
    },
    invalidLogin: {
        fontSize: 12,
        fontFamily: Manrope.Light,
        color: Color.red,
        textAlign: 'left',
        marginTop: 10,
    },
    numberTextBox: {
        flex: 1,
        display: 'flex',
        height: 55,
        borderLeftColor: Color.Venus,
        borderLeftWidth: 1,
        color: Color.black,
        fontSize: 14,
        padding: 5,
        paddingTop: 5,
        paddingHorizontal: 10,
        fontFamily: Manrope.SemiBold,
        alignItems: 'flex-start',
    },
});

//make this component available to the app
export default StoreRegister;
