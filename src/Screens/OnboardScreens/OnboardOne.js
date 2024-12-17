//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {useNavigation} from '@react-navigation/native';
import Color from '../../Global/Color';
import {Manrope, Marcellus} from '../../Global/FontFamily';
import messaging from '@react-native-firebase/messaging';

// create a component
const OnboardOne = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const imageScale = new Animated.Value(0.1);

  useEffect(async () => {
    try {
      const token = await messaging().getToken();
      console.log('token ----------- : ', token);
    } catch (error) {
      console.log('error ----------- : ', error);
    }
  }, []);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  const handleBackPress = () => {
    console.log('Back button pressed');
    return true;
  };
  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
  const Getstart = async () => {
    navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Images/onboard.jpg')}
        style={styles.image}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          position: 'absolute',
          bottom: 50,
          // zIndex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '95%',
            // backgroundColor: 'red',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              color: Color.white,
              fontSize: 39,
              fontFamily: Marcellus?.Marcellus_Regular,
              // fontWeight: '400',
              // fontFamily: Manrope.Bold,
              // fontFamily: Marcellus?.Marcellus_Regular,
            }}>
            Effortless Access To Exquisite
            <Text
              style={{
                color: '#CC9933',
                fontSize: 39,
                fontFamily: Marcellus?.Marcellus_Regular,
              }}>
              {' '}
              Jewelry
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            Getstart();
          }}
          style={{
            width: '90%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            backgroundColor: Color.white,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Manrope.Medium,
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    width: scr_width,
    height: scr_height,
    resizeMode: 'contain',
  },
});

//make this component available to the app
export default OnboardOne;
