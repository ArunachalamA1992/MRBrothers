import React, {useEffect, useState} from 'react';
import {
  Linking,
  LogBox,
  NativeEventEmitter,
  StatusBar,
  View,
  NativeModules,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as ReduxProvider, useDispatch} from 'react-redux';

import {Provider as PaperProvider} from 'react-native-paper';
import Store from './Redux/Store';
import Icon from 'react-native-vector-icons/Ionicons';
import {setCountryCode, setUserData} from './Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from './Global/Color';
import SplashScreen from './Splash';
import TabNavigator from './route';
import TermsandConditions from './Screens/SideMenu/TermsandConditions';
import PrivacyPolicy from './Screens/SideMenu/PrivacyPolicy';
import ContactUs from './Screens/SideMenu/ContactUs';
import AboutUs from './Screens/SideMenu/AboutUs';
import {Manrope} from './Global/FontFamily';
import ProfileView from './Screens/ProfileScreens/ProfileView';
import MyCart from './Screens/Home/MyCart';
import Notification_Screen from './Screens/Home/BottomTabs/Notification';
import SelectCategory from './Screens/Home/SelectCategory';
import OrderSuccess from './Screens/Home/OrderSuccess';
import OrderSummary from './Screens/Home/OrderSummary';
import SearchScreen from './Screens/Home/SearchScreen';
import messaging from '@react-native-firebase/messaging';
import {
  getFCMToken,
  notificationPermission,
  requestUserPermission,
} from './Components/pushnotification';
import AppContext from './AppContext';
import OnboardOne from './Screens/OnboardScreens/OnboardOne';
import Register from './Screens/Auth/Register';
import StoreRegister from './Screens/Auth/StoreRegister';
import Login from './Screens/Auth/Login';
import OTPScreen from './Screens/Auth/OTPScreen';
import Stacknavigation from './Screens/navigation/Stack';
import NewStoreRegister from './Screens/Auth/NewStoreRegister';
import {createChannel, handleNotification} from './Utils/notification';
import ProductListing from './Screens/Home/ProductListing';
import ProductDetails from './Screens/Home/ProductDetails';
import {Iconviewcomponent} from './Components/Icontag';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();
export const navigationRef = React.createRef();

const App = () => {
  const [expiresDate, setExpiresDate] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const fetchExpiresDate = async () => {
    try {
      const storedExpiresDate = await AsyncStorage.getItem('Expires_At');
      if (storedExpiresDate) {
        const timestamp = JSON.parse(storedExpiresDate);
        if (!isNaN(timestamp)) {
          console.log('ggggggg', timestamp);

          setExpiresDate(timestamp);
        } else {
          console.log('Invalid timestamp', timestamp);
          setExpiresDate(timestamp);
        }
      } else {
        console.log('No expiry date found');
      }
    } catch (error) {
      console.error('Failed to fetch expiry date', error);
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      // You can save this token to your server for sending push notifications
    } else {
      console.log('Failed to get FCM token');
    }
    console.log('=========>FCM TOKEN', fcmToken);
  };
  useEffect(() => {
    createChannel();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('remoteMessage', remoteMessage?.notification);
      handleNotification(remoteMessage?.notification);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchExpiresDate();
  }, []);

  useEffect(() => {
    if (expiresDate) {
      const interval = setInterval(() => {
        const now = new Date();
        setCurrentTime(now);
        console.log('eeeeeeeeeeeeeee');

        if (now.toISOString() >= expiresDate) {
          clearInterval(interval);
          AsyncStorage.clear();
          // ToastAndroid.show('Your session has expired', ToastAndroid.SHORT);
          Alert.alert('Your session has expired');
          navigationRef.current?.navigate('OnboardOne');
        }
      }, 3000); // checking every minute instead of every second
      return () => clearInterval(interval);
    }
  }, [expiresDate]);

  const Getuserdata = async () => {
    setLoading(false);
    try {
      const TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
      const ACCESS_TOKEN = JSON.parse(TOKEN);
      if (ACCESS_TOKEN) {
        const User_Data = await fetchData?.Single_User_Get();
        if (User_Data?.success === true) {
          dispatch(setUserData(User_Data?.data));
          setLoading(true);
          navigationRef.current?.navigate('TabNavigator');
        } else {
          navigationRef.current?.navigate('OnboardOne');
        }
      } else {
        navigationRef.current?.navigate('OnboardOne');
      }
    } catch (error) {
      console.log('Error getting user data:', error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    requestUserPermission();
    notificationPermission();
    getFcmToken();
    Getuserdata();
  }, []);

  // Rendering SplashScreen with NavigationContainer to prevent the warning
  // if (loading === false) {
  //   return (
  //     <ReduxProvider store={Store}>
  //       <NavigationContainer ref={navigationRef}>
  //         <SplashScreen />
  //       </NavigationContainer>
  //     </ReduxProvider>
  //   );
  // }

  return (
    <ReduxProvider store={Store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnboardOne"
            component={OnboardOne}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StoreRegister"
            component={StoreRegister}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen name="OTPScreen" options={{headerShown: false}}>
            {props => <OTPScreen {...props} gatchData={fetchExpiresDate} />}
          </Stack.Screen>
          <Stack.Screen
            name="ProfileView"
            component={ProfileView}
            options={({navigation}) => ({
              headerTitle: 'Profile View',
              headerTitleStyle: {
                color: Color.black,
                fontSize: 18,
                fontFamily: Manrope.Medium,
                marginLeft: 10,
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                  }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'left'}
                    icon_size={25}
                    iconstyle={{color: Color.black}}
                  />
                  {/* <Text
                    style={{
                      color: Color.black,
                      fontSize: 18,
                      fontFamily: Manrope.Medium,
                      marginLeft: 10,
                    }}>
                    Cart
                  </Text> */}
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="SelectCategory"
            component={SelectCategory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyCart"
            component={MyCart}
            options={({navigation}) => ({
              headerTitle: 'Cart',
              // headerTitleAlign: 'center',
              headerTitleStyle: {
                color: Color.black,
                fontSize: 18,
                fontFamily: Manrope.Medium,
                marginLeft: 10,
              },
              // headerStyle: {backgroundColor: Color.white},
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                  }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'left'}
                    icon_size={25}
                    iconstyle={{color: Color.black}}
                  />
                  {/* <Text
                    style={{
                      color: Color.black,
                      fontSize: 18,
                      fontFamily: Manrope.Medium,
                      marginLeft: 10,
                    }}>
                    Cart
                  </Text> */}
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="OrderSuccess"
            component={OrderSuccess}
            options={({navigation}) => ({
              headerTitle: 'Order Placed',
              headerTitleStyle: {
                color: Color.black,
                fontSize: 18,
                fontFamily: Manrope.Medium,
                marginLeft: 10,
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TabNavigator', {
                      screen: 'MyOrderTab',
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                  }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'left'}
                    icon_size={25}
                    iconstyle={{color: Color.black}}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="OrderSummary"
            component={OrderSummary}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TermsandConditions"
            component={TermsandConditions}
            options={({navigation}) => ({
              headerTitle: 'Terms & Conditions',
              headerTitleAlign: 'center',
              headerTitleStyle: {color: Color.black},
              headerStyle: {backgroundColor: Color.white, elevation: 1},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Color.black}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={({navigation}) => ({
              headerTitle: 'Privacy Policy',
              headerTitleStyle: {color: Color.black},
              headerStyle: {backgroundColor: Color.white, elevation: 1},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Color.black}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="ContactUs"
            component={ContactUs}
            options={({navigation}) => ({
              headerTitle: 'Contact Us',
              headerTitleStyle: {color: Color.black},
              headerStyle: {backgroundColor: Color.white, elevation: 1},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Color.black}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUs}
            options={({navigation}) => ({
              headerTitle: 'About Us',
              headerTitleStyle: {color: Color.black},
              headerStyle: {backgroundColor: Color.white, elevation: 1},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Color.black}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={Notification_Screen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NewStoreRegister"
            component={NewStoreRegister}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{headerShown: false}}
            // options={({ navigation, route }) => ({
            //   headerTitle: 'Product Details',
            //   headerTitleAlign: 'center',
            //   headerTitleStyle: {
            //     color: Color.black,
            //     fontSize: 18,
            //     fontFamily: Manrope.Bold,
            //   },
            //   headerStyle: { backgroundColor: Color.white },
            //   headerLeft: () => (
            //     <View style={{ marginHorizontal: 10 }}>
            //       <Icon
            //         name="arrow-back"
            //         size={30}
            //         color={Color.black}
            //         onPress={() => navigation.goBack()}
            //       />
            //     </View>
            //   ),
            // })}
          />
          <Stack.Screen
            name="ProductListing"
            component={ProductListing}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
