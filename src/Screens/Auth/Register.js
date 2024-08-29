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
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { ToastAndroid } from 'react-native';

// create a component
const Register = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
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
                // ToastAndroid.show("Login Success! Welcome to MR Brothers", ToastAndroid.SHORT)
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
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/Images/verify.jpg')}
                    style={styles.image}
                />
            </View>
            <View style={{ flex: 2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '95%', padding: 10, marginTop: 20, }}>
                    <Text style={{ textAlign: 'left', fontSize: 26, color: Color.black, fontFamily: Manrope.Bold, }}>Create Account</Text>
                    <Text style={{ textAlign: 'left', fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, }}>to Access Exclusive Jewelry Collections</Text>
                </View>
                <View style={{ width: '95%', padding: 10, }}>
                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.Medium, }}>Name *</Text>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.NumberBoxConatiner}>
                            <View style={styles.numberCountryCode}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'user'}
                                    icon_size={20}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                            </View>
                            <TextInput
                                placeholder={'Enter your Name'}
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
                        </View>
                        {error && <Text style={styles.invalidLogin}>{error}</Text>}
                    </View>
                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.Medium, }}>Email Address *</Text>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.NumberBoxConatiner}>
                            <View style={styles.numberCountryCode}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'mail'}
                                    icon_size={20}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                            </View>
                            <TextInput
                                style={styles.numberTextBox}
                                placeholder="Enter Your Email Address"
                                placeholderTextColor={Color.cloudyGrey}
                                value={email}
                                onChangeText={value => {
                                    setEmail(value);
                                    handleValidEmail(value);
                                }}
                                keyboardType="email-address"
                            />
                        </View>
                        {emailValidError ? (
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontFamily: Manrope.Regular,
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                    fontSize: 14,
                                    color: 'red',
                                }}>
                                {emailValidError}
                            </Text>
                        ) : null}
                    </View>
                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.Medium, }}>Mobile Number *</Text>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.NumberBoxConatiner}>
                            <View style={styles.numberCountryCode}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'phone-call'}
                                    icon_size={20}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                            </View>
                            <TextInput
                                placeholder={'Enter your mobile number'}
                                placeholderTextColor={Color.cloudyGrey}
                                value={number}
                                maxLength={10}
                                autoFocus={false}
                                keyboardType='phone-pad'
                                onChangeText={input => {
                                    chkNumber(input);
                                    chkNumberError(input);
                                }}
                                style={styles.numberTextBox}
                            />
                        </View>
                        {error && <Text style={styles.invalidLogin}>{error}</Text>}
                    </View>
                    <TouchableOpacity
                        onPress={() => registerClick()}
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
                        <Text style={{ fontSize: 16, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Continue</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'flex-end', alignItems: 'center'
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            style={{
                                textAlign: 'justify',
                                fontSize: 12,
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Medium,
                                lineHeight: 20,
                            }}>
                            By tapping continue with google, You agree to{' '}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'justify',
                                fontSize: 14,
                                color: Color.primary,
                                fontFamily: Manrope.Bold,
                                lineHeight: 20,
                            }}>
                            MR Brothers
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TermsandConditions')}>
                            <Text
                                style={{
                                    textAlign: 'justify',
                                    fontSize: 13,
                                    color: Color.primary,
                                    textDecorationLine: 'underline',
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    lineHeight: 20,
                                }}>
                                Terms and Conditions
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                textAlign: 'justify',
                                fontSize: 12,
                                paddingHorizontal: 5,
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Medium,
                                letterSpacing: 0.5,
                                lineHeight: 20,
                            }}>
                            and
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('PrivacyPolicy')}>
                            <Text
                                style={{
                                    textAlign: 'justify',
                                    fontSize: 13,
                                    color: Color.primary,
                                    textDecorationLine: 'underline',
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    lineHeight: 20,
                                }}>
                                Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            color: Color.cloudyGrey,
                            fontFamily: Manrope.Medium,
                        }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: Color.primary,
                                fontFamily: Manrope.SemiBold,
                                paddingHorizontal: 5, textDecorationLine: 'underline'
                            }}>Sign In</Text>
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
export default Register;
