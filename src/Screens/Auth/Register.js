//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope, Marcellus} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {ToastAndroid} from 'react-native';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(null);

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
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setName('');
      setNumber('');
      return () => {};
    }, []),
  );

  const handleBackPress = () => {
    console.log('Back button pressed');
    return true;
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

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // const registerClick = async () => {
  //   try {
  //     setLoading(true);
  //     const numberIsMobile = isMobile(number);
  //     if (name != '' && email != '' && number != '') {
  //       if (validateEmail(email)) {
  //         var data = {
  //           mobile: number,
  //         };
  //         const New_Mobile_Number = await fetchData?.new_mobilenumber(data, null);
  //         if (New_Mobile_Number?.success == true) {
  //           ToastAndroid.show('OTP has been sent', ToastAndroid.SHORT);
  //           setLoading(false);
  //           await AsyncStorage.setItem('ACCESS_TOKEN', New_Mobile_Number?.token);
  //           navigation.navigate('OTPScreen', {
  //             IS_Mobile_number: false,
  //             Mobile_Number: number,
  //             userdata: {name: name, email: email, mobilenumber: number},
  //             token: New_Mobile_Number?.token,
  //           });
  //         } else {
  //           ToastAndroid.show(New_Mobile_Number?.message, ToastAndroid.SHORT);
  //           setLoading(false);
  //         }
  //         setLoading(false);
  //       }
  //       } else {
  //         // Show error for invalid email
  //         console.log("Invalid email format!");
  //       }
  //     }
  //       else {
  //       ToastAndroid.show(
  //         'Please select all the mandatory fields',
  //         ToastAndroid.SHORT,
  //       );
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log('catch in login_Verify :', error);
  //     ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  //     setLoading(false);
  //   }
  // };
  const registerClick = async () => {
    try {
      setLoading(true);
      if (name !== '' && email !== '' && number !== '') {
        if (validateEmail(email)) {
          const numberIsMobile = isMobile(number);
          var data = {
            email: email,
            mobile: number,
          };
          const New_Mobile_Number = await fetchData?.new_mobilenumber(
            data,
            null,
          );
          if (New_Mobile_Number?.success === true) {
            ToastAndroid.show('OTP has been sent', ToastAndroid.SHORT);
            // await AsyncStorage.setItem(
            //   'ACCESS_TOKEN',
            //   JSON.stringify(New_Mobile_Number?.token),
            // );
            navigation.navigate('OTPScreen', {
              IS_Mobile_number: false,
              Mobile_Number: number,
              userdata: {name: name, email: email, mobilenumber: number},
              token: New_Mobile_Number?.token,
            });
          } else {
            ToastAndroid.show(New_Mobile_Number?.message, ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show('Invalid email format!', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          'Please fill in all the mandatory fields',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('catch in login_Verify:', error);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <View
        style={{
          flex: 0.5,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/Images/verify.jpg')}
          style={styles.image}
        />
      </View> */}
      <View
        style={{
          width: scr_width,
          height: scr_height / 3.44,
          backgroundColor: Color?.white,
        }}>
        <Image
          source={require('../../assets/Images/createscreen.jpg')} // Use your image path here
          style={styles.image}></Image>
      </View>
      <View
        style={{
          flex: 0.3,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '95%', padding: 10, marginTop: 20}}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 26,
              color: Color.black,
              fontFamily: Marcellus?.Marcellus_Regular,
              fontWeight: '400',
            }}>
            Create Account
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Manrope.Regular,
            }}>
            To Access Exclusive Jewelry Collections
          </Text>
        </View>
        <View style={{width: '95%', padding: 10}}>
          {/* <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Manrope.Medium,
            }}>
            Name *
          </Text> */}
          <View style={{marginVertical: 10}}>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder={'Your Name'}
                placeholderTextColor={Color.cloudyGrey}
                value={name}
                // maxLength={10}
                autoFocus={false}
                keyboardType="name-phone-pad"
                onChangeText={input => {
                  const nameRegex = /^[A-Za-z\s]*$/;
                  if (input.length === 0) {
                    setName(input);
                    setNameError('Please enter your valid name');
                  } else if (!nameRegex.test(input)) {
                    setNameError(
                      'Name cannot contain numbers or special characters',
                    );
                  } else {
                    setName(input);
                    setNameError(null);
                  }
                }}
                style={styles.numberTextBox}
              />
              <View style={styles.numberCountryCode}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'user'}
                  icon_size={20}
                  iconstyle={{color: Color.cloudyGrey}}
                />
              </View>
            </View>
            {nameError == null ? null : (
              <Text style={styles.invalidLogin}>{nameError}</Text>
            )}
          </View>
          {/* <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Manrope.Medium,
            }}>
            Email Address *
          </Text> */}
          <View style={{marginVertical: 10}}>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                style={styles.numberTextBox}
                placeholder="Email Address"
                placeholderTextColor={Color.cloudyGrey}
                value={email}
                onChangeText={value => {
                  setEmail(value);
                  handleValidEmail(value);
                }}
                keyboardType="email-address"
              />
              <View style={styles.numberCountryCode}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'mail'}
                  icon_size={20}
                  iconstyle={{color: Color.cloudyGrey}}
                />
              </View>
            </View>
            {emailValidError ? (
              <Text style={styles.invalidLogin}>{emailValidError}</Text>
            ) : null}
          </View>
          {/* <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Manrope.Medium,
            }}>
            Mobile Number *
          </Text> */}
          <View style={{marginVertical: 10}}>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder={'Mobile Number'}
                placeholderTextColor={Color.cloudyGrey}
                value={number}
                maxLength={10}
                autoFocus={false}
                keyboardType="phone-pad"
                onChangeText={input => {
                  chkNumber(input);
                  chkNumberError(input);
                }}
                style={styles.numberTextBox}
              />
              <View style={styles.numberCountryCode}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone-call'}
                  icon_size={20}
                  iconstyle={{color: Color.cloudyGrey}}
                />
              </View>
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
            }}
            disabled={loading ? true : false}>
            {loading ? (
              <ActivityIndicator color={Color.white} />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}>
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 12,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Regular,
                lineHeight: 20,
              }}>
              By clicking continue you agree to MR Brothers
            </Text>
            {/* <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.primary,
                fontFamily: Manrope.Bold,
                lineHeight: 20,
              }}>
              MR Brothers
            </Text> */}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TermsandConditions')}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 13,
                  color: Color.black,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  lineHeight: 20,
                }}>
                Terms of Use
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 12,
                paddingHorizontal: 5,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Regular,
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
                  color: Color.black,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  lineHeight: 20,
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: Color.cloudyGrey,
              fontFamily: Manrope.Regular,
              fontWeight: '400',
            }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 16,
                color: Color.primary,
                fontFamily: Manrope.Bold,
                paddingHorizontal: 5,
                fontWeight: '600',
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  image: {
    width: '100%',
    height: '100%',
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
    // borderLeftWidth: 1,
    color: Color.black,
    fontSize: 14,
    padding: 5,
    paddingTop: 5,
    fontWeight: '400',
    paddingHorizontal: 10,
    fontFamily: Manrope.Regular,
    alignItems: 'flex-start',
  },
});

//make this component available to the app
export default Register;
