//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ToastAndroid } from 'react-native';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    PermissionsAndroid,
    Modal,
    Button,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import RNOtpVerify from 'react-native-otp-verify';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import OTPInput from '../../Components/OTPInput';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

// create a component
const OTPScreen = ({ route, AppState }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [number] = useState(route.params.number);
    const [token, setToken] = useState(route.params.token);

    const inputRef = useRef();
    const [otpCode, setOTPCode] = useState('');
    const [error, setError] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [loading, setLoading] = useState(false);
    const [isPinReady, setIsPinReady] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(30);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    useEffect(() => {
        if (Platform.OS === 'android') {
            RNOtpVerify.getHash()
                .then(hash => console.log('Hash:', hash))
                .catch(error => console.error('Error getting hash:', error));

            startListeningForOtp();
        }
    }, []);

    const startListeningForOtp = () => {
        RNOtpVerify.getOtp()
            .then(receivedSMS => {
                console.log('Received SMS:', receivedSMS);
                // setOTPCode('1234');
                RNOtpVerify.addListener(otpHandler.bind(this));
            })
            .catch(error => console.error('Error getting SMS:', error));
    };

    const otpHandler = message => {
        try {
            const otpMatch = /(\d{4})/g.exec(message);
            if (otpMatch && otpMatch[1]) {
                const otpDigit = otpMatch[1];
                setOTPCode(prevOTP => prevOTP + otpDigit);
                if (otpCode.length + otpDigit.length === 4) {
                    console.log('Complete OTP received:', otpCode + otpDigit);
                }
            } else {
                console.log('No valid OTP found in the message:', message);
            }
        } catch (e) {
            console.error('Error extracting OTP:', e);
        }
    };

    const isMobile = input => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(input);
    };

    const chkOTPError = OTP => {
        let reg = /^[6-9][0-9]*$/;

        if (OTP.length === 0) {
            setError('Enter Your OTP Code');
        } else if (reg.test(OTP) === false) {
            setError(false);
            setError(false);
        } else if (reg.test(OTP) === true) {
            setError('');
        }
    };

    const VerifyOTP = async () => {
        setLoading(true);
        if (otpCode.length == 4) {
            navigation.replace('TabNavigator');
            //   var data = {
            //     otp: otpCode,
            //   };
            //   const VerifyOTP =await fetchData.login_verify_otp(data, token);
            //   if (VerifyOTP?.status == true) {
            //     const UserLogin = {
            //       ...VerifyOTP?.data,
            //       token: VerifyOTP?.token,
            //     };
            //     await AsyncStorage.setItem('user_data', JSON.stringify(UserLogin));
            //     ToastAndroid.show("Welcome to MR Brothers", ToastAndroid.SHORT)
            //     navigation.replace('TabNavigator');
            //   } else {
            //     setOTPCode('');
            //     inputRef.current.focus();
            //     var msg = VerifyOTP?.message;
            //     setError(msg);
            //   }
        } else {
            if (Platform.OS === 'android') {
                ToastAndroid.show("Invalid OTP Code Please Enter Your 4 Digit OTP Code", ToastAndroid.SHORT)
            } else {
                alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
                setLoading(false);
                setVisible(false);
            }
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
            keyboardShouldPersistTaps="handled">
            <DismissKeyboard>
                <View style={{
                    flex: 1,
                    backgroundColor: Color.white,
                    justifyContent: 'center', alignItems: 'center',
                    padding: 10,
                }}>
                    <Text
                        style={{
                            fontFamily: Manrope.Bold,
                            fontSize: 20,
                            textAlign: 'center',
                            color: Color.black,
                            marginVertical: 10,
                            letterSpacing: 0.5,
                        }}>Enter OTP </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: Color.cloudyGrey,
                            fontFamily: Manrope.Regular,
                            letterSpacing: 0.5,
                            paddingTop: 10,
                            textAlign: 'center',
                        }}>
                        Enter the verification code we sent to your number{' '}
                        <Text
                            style={{
                                fontSize: 16,
                                color: Color.lightBlack,
                                fontFamily: Manrope.Medium,
                                letterSpacing: 0.5,
                            }}>
                            {/* {isMobile(number) && countryCode?.mobile_prefix} */}
                            {number?.substring(0, 2).concat('*** **') +
                                number.substring(7, 9) +
                                number.substring(9)}
                        </Text>
                    </Text>
                    <Text style={styles.invalidLogin}>{error}</Text>
                    <View style={styles.otpInputView}>
                        <OTPInput
                            inputRef={inputRef}
                            code={otpCode}
                            setCode={setOTPCode}
                            maximumLength={4}
                            setIsPinReady={setIsPinReady}
                            chkOTPError={chkOTPError}
                        />
                    </View>
                    {seconds > 0 || minutes > 0 ? (
                        <View style={styles.noReceivecodeView}>
                            <Text style={styles.noReceiveText}>
                                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.noReceivecodeView}>
                            <TouchableOpacity>
                                <Text style={styles.resendOtp}>Resend OTP</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => VerifyOTP(navigation)}
                        style={{
                            width: '90%',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Color.primary,
                            borderRadius: 5,
                            marginVertical: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: Color.white,
                                fontFamily: Manrope.SemiBold,
                                letterSpacing: 0.5,
                                textTransform: 'uppercase',
                            }}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </DismissKeyboard>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    otpInputView: {
        marginVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noReceivecodeView: {
        width: '88%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 15,
    },
    noReceiveText: {
        color: Color.black,
        fontSize: 12,
        fontFamily: Manrope.Medium,
    },
    resendOtp: {
        color: Color.black,
        fontSize: 14,
        fontFamily: Manrope.SemiBold,
        textDecorationLine: 'underline',
        textAlign: 'right',
    },
    invalidLogin: {
        fontSize: 14,
        fontFamily: Manrope.SemiBold,
        color: Color.red,
        textAlign: 'center',
        paddingVertical: 10,
    },
});

//make this component available to the app
export default OTPScreen;
