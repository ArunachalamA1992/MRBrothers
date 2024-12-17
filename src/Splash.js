import React, {useState, useEffect, useRef} from 'react';
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
import {Button} from 'react-native-elements';
import {scr_height, scr_width} from './Utils/Dimensions';
import Color from './Global/Color';
import {useNavigation} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from './Redux';
import fetchData from './Config/fetchData';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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

  const Getuserdata = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
      const ACCESS_TOKEN = JSON.parse(TOKEN);
      if (ACCESS_TOKEN) {
        const User_Data = await fetchData?.Single_User_Get();
        if (User_Data?.success == true) {
          dispatch(setUserData(User_Data?.data));
          navigation.replace('TabNavigator');
        } else {
          console.log('Checking onnnnnnnboard ');

          navigation.replace('OnboardOne');
        }
      } else {
        console.log('Checking onnnn333333333nnnboard ');
        // navigation.navigate('OnboardOne');
        setloader(true);
      }
    } catch (error) {
      setloader(true);
      console.log('Error getting Welcome_Screen: ', error);
    }
  };

  useEffect(() => {
    try {
      const SplashLoad = setTimeout(() => {
        Getuserdata();
      }, 3000);
      return () => clearInterval(SplashLoad);
    } catch (error) {
      console.log('catch in splash_Screen ', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Animated.Image
        source={require('../src/assets/Logos/splash_logo.png')}
        style={[styles.image, {transform: [{scale: imageScale}]}]}
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
