//import liraries
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, ImageBackground, ToastAndroid} from 'react-native';
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
  BackHandler,
} from 'react-native';
import {useDispatch} from 'react-redux';
import RNOtpVerify from 'react-native-otp-verify';
import Color from '../../Global/Color';
import {Manrope, Marcellus} from '../../Global/FontFamily';
import OTPInput from '../../Components/OTPInput';
import {scr_height, scr_width} from './../../Utils/Dimensions';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserData} from '../../Redux';
import {useAppContext} from '../../AppContext';
import {setAuthfun} from '../../Redux/user/UserAction';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

// create a component
const OTPScreen = ({route, gatchData}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Route_Data = route?.params;
  // console.log('fcmToken', fcmToken);
  console.log(Route_Data?.token, 'Route_Data');

  const [token, setToken] = useState(Route_Data.token);
  const inputRef = useRef();
  const [otpCode, setOTPCode] = useState('');
  const [error, setError] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [isPinReady, setIsPinReady] = useState(false);
  const [AccessTokenset, setAccessTokenseee] = useState(null);

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
    const backAction = () => {
      if (Route_Data?.IS_Mobile_number == true) {
        // navigation.navigate();
      } else {
        navigation.goBack();
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
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
    try {
      setLoading(true);
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      var Data = {
        otp: otpCode,
        fcm_token: fcmToken,
      };
      if (Data.otp?.length == 4) {
        const Login_VerifyOTP = await fetchData?.User_Login_OTP_Verify(
          Data,
          AccessTokenset == null ? Route_Data?.token : AccessTokenset,
        );
        console.log('fffffffff', Login_VerifyOTP);

        if (Login_VerifyOTP?.success == true) {
          ToastAndroid.show('OTP Verified Successfully', ToastAndroid.SHORT);
          await AsyncStorage.setItem(
            'ACCESS_TOKEN',
            JSON.stringify(Login_VerifyOTP?.token),
          );
          await AsyncStorage.setItem(
            'User_Data',
            JSON.stringify(Login_VerifyOTP?.data),
          );
          if (Login_VerifyOTP?.data?.expires_at) {
            await AsyncStorage.setItem(
              'Expires_At',
              JSON.stringify(Login_VerifyOTP?.data?.expires_at),
            );
            gatchData();
          }
          setLoading(false);
          dispatch(setUserData(Login_VerifyOTP?.data));
          // i want clear all catch navigation

          // navigation.replace('TabNavigator');
          navigation.dispatch(StackActions.replace('TabNavigator'));
          // navigation.push({
          //   index: 0,
          //   routes: [{ name: 'TabNavigator' }],
          // });
          // navigation.reset({index: 0, routes: [{name: 'TabNavigator'}]});
          setOTPCode('');
        } else {
          console.log(Login_VerifyOTP, 'Login_VerifyOTP');
          setLoading(false);
          ToastAndroid.show(Login_VerifyOTP?.message, ToastAndroid.SHORT);
        }
      } else {
        if (Platform.OS === 'android') {
          setLoading(false);
          ToastAndroid.show('Invalid OTP Code', ToastAndroid.SHORT);
        } else {
          setLoading(false);
          ToastAndroid.show(
            'Invalid OTP Code Please Enter Your 4 Digit OTP Code',
            ToastAndroid.SHORT,
          );
        }
      }
    } catch (error) {
      if (Platform.OS === 'android') {
        setLoading(false);
        console.log('!!!!!!!!!!!!!!!!!!! : ', error);

        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      } else {
        setLoading(false);
        alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
      }
      console.log('catch in New_User_OTP_Verify : ', error);
    }
  };

  const Go_Register = async () => {
    try {
      setLoading(true);
      var data = {
        otp: otpCode,
      };
      if (otpCode) {
        console.log(data, 'data');
        const VerifyOTP = await fetchData?.new_mobilenumber_OTP_Verify(
          data,
          AccessTokenset == null ? Route_Data?.token : AccessTokenset,
        );
        if (VerifyOTP?.success == true) {
          ToastAndroid.show('OTP Verified Successfully', ToastAndroid.SHORT);
          setLoading(false);
          // navigation.navigate('StoreRegister', {
          //   userdata: Route_Data?.userdata,
          // });
          navigation.navigate('NewStoreRegister', {
            userdata: Route_Data?.userdata,
            token: AccessTokenset == null ? Route_Data?.token : AccessTokenset,
          });
          setOTPCode('');
        } else {
          console.log(VerifyOTP, 'VerifyOTP');
          setLoading(false);
          ToastAndroid.show(VerifyOTP?.message, ToastAndroid.SHORT);
        }
      } else {
        if (Platform.OS === 'android') {
          setLoading(false);
          ToastAndroid.show('Invalid OTP Code', ToastAndroid.SHORT);
        } else {
          setLoading(false);
          alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
        }
      }
    } catch (error) {
      if (Platform.OS === 'android') {
        setLoading(false);
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      } else {
        setLoading(false);
        alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
      }
      console.log('catch in New_User_OTP_Verify : ', error);
    }
  };

  const ResendOtp = async data => {
    try {
      setSeconds(30);
      const Data = {
        mobile: data,
      };
      const UserLogin = await fetchData?.User_Login(Data, null);
      if (UserLogin?.success == true) {
        ToastAndroid.show('OTP send successfully', ToastAndroid.SHORT);
        setAccessTokenseee(UserLogin?.token);
        await AsyncStorage.setItem('ACCESS_TOKEN', UserLogin?.token);
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('catch in ResendOtp : ', error);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const Register_resend_otp = async data => {
    try {
      var Data = {
        mobile: data,
        email: Route_Data?.userdata?.email,
      };
      const New_Mobile_Number = await fetchData?.new_mobilenumber(Data, null);
      if (New_Mobile_Number?.success == true) {
        ToastAndroid.show('OTP send successfully', ToastAndroid.SHORT);
        setAccessTokenseee(New_Mobile_Number?.token);
        await AsyncStorage.setItem('ACCESS_TOKEN', New_Mobile_Number?.token);
      } else {
        console.log('dddddd', New_Mobile_Number, 'New_Mobile_Number');

        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('catch in New ResendOtp : ', error);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  return (
    // <ScrollView
    //   contentContainerStyle={{
    //     justifyContent: 'center',
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     opacity: 0.9,
    //   }}
    //   keyboardShouldPersistTaps="handled">
    //   <View>
    //     <Image
    //       source={require('../../assets/Images/verify.jpg')}
    //       style={styles.image}></Image>
    //   </View>
    //   <DismissKeyboard>
    //     <View
    //       style={{
    //         flex: 1,
    //         // backgroundColor: Color.white,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         padding: 10,
    //       }}>
    //       <Text
    //         style={{
    //           fontFamily: Manrope.Bold,
    //           fontSize: 20,
    //           textAlign: 'center',
    //           color: Color.black,
    //           marginVertical: 10,
    //           letterSpacing: 0.5,
    //         }}>
    //         Verify Your Account
    //       </Text>
    //       <Text
    //         style={{
    //           fontSize: 14,
    //           color: Color.cloudyGrey,
    //           fontFamily: Manrope.Regular,
    //           letterSpacing: 0.5,
    //           paddingTop: 10,
    //           textAlign: 'center',
    //         }}>
    //         Enter the verification code we sent to your number{' '}
    //         <Text
    //           style={{
    //             fontSize: 16,
    //             color: Color.lightBlack,
    //             fontFamily: Manrope.Medium,
    //             letterSpacing: 0.5,
    //           }}>
    //           {Route_Data?.Mobile_Number?.substring(0, 2).concat('*** **') +
    //             Route_Data?.Mobile_Number?.substring(7, 9) +
    //             Route_Data?.Mobile_Number?.substring(9)}
    //         </Text>
    //       </Text>
    //       <Text style={styles.invalidLogin}>{error}</Text>
    //       <View style={styles.otpInputView}>
    //         <OTPInput
    //           inputRef={inputRef}
    //           code={otpCode}
    //           setCode={setOTPCode}
    //           maximumLength={4}
    //           setIsPinReady={setIsPinReady}
    //           chkOTPError={chkOTPError}
    //         />
    //       </View>

    //       <TouchableOpacity
    //         onPress={() => {
    //           Route_Data?.IS_Mobile_number == false
    //             ? Go_Register()
    //             : VerifyOTP(navigation);
    //         }}
    //         style={{
    //           width: '90%',
    //           height: 50,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           backgroundColor: Color.primary,
    //           borderRadius: 5,
    //           marginTop: 20,
    //           marginVertical: 10,
    //         }}
    //         disabled={loading ? true : false}>
    //         {loading ? (
    //           <ActivityIndicator size="small" color={Color.white} />
    //         ) : (
    //           <Text
    //             style={{
    //               fontSize: 16,
    //               color: Color.white,
    //               fontFamily: Manrope.SemiBold,
    //               letterSpacing: 0.5,
    //               textTransform: 'capitalize',
    //             }}>
    //             Verify
    //           </Text>
    //         )}
    //       </TouchableOpacity>
    //       <View style={{paddingTop: 10}}>
    //         {seconds > 0 || minutes > 0 ? (
    //           <View style={styles.noReceivecodeView}>
    //             <Text style={{color: Color?.black}}>Request code again : </Text>
    //             <Text style={styles.noReceiveText}>
    //               {minutes < 10 ? `0${minutes}` : minutes}:
    //               {seconds < 10 ? `0${seconds}` : seconds}
    //             </Text>
    //           </View>
    //         ) : (
    //           <View style={styles.noReceivecodeView}>
    //             <Text style={styles.resendOtp}>
    //               {' '}
    //               Request code again{' '}
    //               <Text
    //                 style={{color: Color.primary}}
    //                 onPress={() => {
    //                   Route_Data?.IS_Mobile_number == false
    //                     ? Register_resend_otp(Route_Data?.Mobile_Number)
    //                     : ResendOtp(Route_Data?.Mobile_Number);
    //                 }}>
    //                 {' '}
    //                 Resend OTP
    //               </Text>
    //             </Text>
    //           </View>
    //         )}
    //       </View>
    //     </View>
    //   </DismissKeyboard>
    // </ScrollView>

    <ScrollView
      style={{flex: 1, backgroundColor: Color?.white}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/Images/verify.jpg')} // Use your image path here
        style={styles.image}></ImageBackground>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            // backgroundColor: Color.white,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: Marcellus?.Marcellus_Regular,
              fontWeight: '400',
              fontSize: 30,
              textAlign: 'center',
              color: Color.black,
              marginVertical: 10,
              letterSpacing: 0.5,
            }}>
            Verify Your Account
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Manrope.Regular,
              letterSpacing: 0.5,
              // paddingTop: 10,
              fontWeight: '400',
              textAlign: 'center',
            }}>
            Enter the verification code we sent to your Registered number +91{' '}
            <Text
              style={{
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Regular,
                letterSpacing: 0.5,
              }}>
              {Route_Data?.Mobile_Number?.substring(0, 2).concat('*** **') +
                Route_Data?.Mobile_Number?.substring(7, 9) +
                Route_Data?.Mobile_Number?.substring(9)}
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

          <TouchableOpacity
            onPress={() => {
              Route_Data?.IS_Mobile_number == false
                ? Go_Register()
                : VerifyOTP(navigation);
            }}
            style={{
              width: '90%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.primary,
              borderRadius: 5,
              marginTop: 20,
              marginVertical: 10,
            }}
            disabled={loading ? true : false}>
            {loading ? (
              <ActivityIndicator size="small" color={Color.white} />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  fontWeight: '500',
                  textTransform: 'capitalize',
                }}>
                Verify
              </Text>
            )}
          </TouchableOpacity>
          <View style={{paddingTop: 30}}>
            {seconds > 0 || minutes > 0 ? (
              <View style={styles.noReceivecodeView}>
                <Text style={{color: Color?.black}}>Request code again : </Text>
                <Text style={styles.noReceiveText}>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </View>
            ) : (
              <View style={styles.noReceivecodeView}>
                <Text style={styles.resendOtp}>
                  {' '}
                  Request code again{' '}
                  <Text
                    style={{
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                      fontWeight: '700',
                    }}
                    onPress={() => {
                      Route_Data?.IS_Mobile_number == false
                        ? Register_resend_otp(Route_Data?.Mobile_Number)
                        : ResendOtp(Route_Data?.Mobile_Number);
                    }}>
                    {' '}
                    Resend OTP
                  </Text>
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
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
  image: {
    flex: 1,
    width: scr_width,
    height: scr_height / 2,
    resizeMode: 'stretch',
    opacity: 1,
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
    // marginVertical: 15,
  },
  noReceiveText: {
    color: Color.primary,
    fontSize: 12,
    fontFamily: Manrope.Bold,
    fontWeight: '700',
  },
  resendOtp: {
    color: '#888888',
    fontSize: 14,
    fontFamily: Manrope.Regular,
    // textDecorationLine: 'underline',
    textAlign: 'right',
  },
  invalidLogin: {
    fontSize: 14,
    fontFamily: Manrope.SemiBold,
    color: Color.red,
    textAlign: 'center',
    paddingVertical: 10,
  },
  image: {
    width: scr_width,
    height: scr_height / 2.5,
    resizeMode: 'stretch',
  },
});

//make this component available to the app
export default OTPScreen;
