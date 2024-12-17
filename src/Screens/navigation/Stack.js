import React, {useState, useEffect} from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from '../../route';
import ProfileView from '../ProfileScreens/ProfileView';
import SelectCategory from '../Home/SelectCategory';
import SearchScreen from '../Home/SearchScreen';
import MyCart from '../Home/MyCart';
import OrderSuccess from '../Home/OrderSuccess';
import OrderSummary from '../Home/OrderSummary';
import TermsandConditions from '../SideMenu/TermsandConditions';
import PrivacyPolicy from '../SideMenu/PrivacyPolicy';
import AboutUs from '../SideMenu/AboutUs';
import ContactUs from '../SideMenu/ContactUs';
import Notification_Screen from '../Home/BottomTabs/Notification';
import OnboardOne from '../OnboardScreens/OnboardOne';
import Register from '../Auth/Register';
import StoreRegister from '../Auth/StoreRegister';
import Login from '../Auth/Login';
import OTPScreen from '../Auth/OTPScreen';
import SplashScreen from '../../Splash';
import fetchData from '../../Config/fetchData';
import { setUserData } from '../../Redux';
import {useDispatch , useSelector} from 'react-redux';
import AppContext from '../../AppContext';
import { useNavigation } from '@react-navigation/native';
import Color from '../../Global/Color';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Stacknavigation = () => {
  const navigation = useNavigation(); 
    const dispatch = useDispatch();
  const [loader, setloader] = useState(false);
  const Stack = createNativeStackNavigator();
  return(
       <Stack.Navigator initialRouteName='SplashScreen'>
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
            {props => <OTPScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="ProfileView"
            component={ProfileView}
            options={({navigation, route}) => ({
              headerTitle: 'Profile View',
              headerTitleAlign: 'center',
              headerTitleStyle: {color: Color.black},
              headerStyle: {backgroundColor: Color?.white},
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
            options={({navigation, route}) => ({
              headerTitle: 'My Cart',
              headerTitleAlign: 'center',
              headerTitleStyle: {color: Color.black},
              headerStyle: {backgroundColor: Color.white},
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
            name="OrderSuccess"
            component={OrderSuccess}
            //  options={{headerShown: false}}
            options={({navigation, route}) => ({
              headerTitle: 'Order Placed',
              headerTitleAlign: 'center',
              headerTitleStyle: {color: Color.black},
              headerStyle: {backgroundColor: Color.white, elevation: 1},
              headerLeft: () => (
                <View style={{marginHorizontal: 10}}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={Color.black}
                    onPress={() =>
                      navigation.navigate('TabNavigator', {
                        screen: 'MyOrderTab',
                      })
                    }
                  />
                </View>
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
            options={({navigation, route}) => ({
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
            options={({navigation, route}) => ({
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
            name="AboutUs"
            component={AboutUs}
            options={({navigation, route}) => ({
              headerTitle: 'About Us',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: Color.black,
                fontSize: 18,
                fontFamily: Manrope.Bold,
              },
              headerStyle: {backgroundColor: Color.white},
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
            options={({navigation, route}) => ({
              headerTitle: 'Contact Us',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: Color.black,
                fontSize: 18,
                fontFamily: Manrope.Bold,
              },
              headerStyle: {backgroundColor: Color.white},
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
       </Stack.Navigator>
  )
};



export default Stacknavigation;
