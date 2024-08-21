import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Button } from 'react-native-elements';
import { scr_height, scr_width } from './Utils/Dimensions';
import Color from './Global/Color';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const SplashScreen = () => {

  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const imageScale = new Animated.Value(0.1);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  const setNetInfo = () => {
    NetInfo.fetch().then(state => {
      setLoading(state.isConnected);
    });
  };

  useEffect(() => {
    try {
      const SplashLoad = setTimeout(() => {
        navigation.navigate('OnboardOne');
      }, 3000);
      return () => clearInterval(SplashLoad);
    } catch (error) {
      console.log('catch in splash_Screen ', error);
    }
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.Image
        source={require('../src/assets/Logos/splash_logo.png')}
        style={[styles.image, { transform: [{ scale: imageScale }] }]}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
});
