import React, { useEffect, useState } from 'react';
import {
  Linking,
  LogBox,
  NativeEventEmitter,
  StatusBar,
  View, NativeModules
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider, useDispatch } from 'react-redux';

import { Provider as PaperProvider } from 'react-native-paper';
// import {navigationRef} from '../RootNavigation';
import Store from './Redux/Store';
import Icon from 'react-native-vector-icons/Ionicons';
import { setCountryCode, setUserData } from './Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardOne from './Screens/OnboardScreens/OnboardOne';
import Color from './Global/Color';
import SplashScreen from './Splash';
import TabNavigator, { Auth } from './route';
import TermsandConditions from './Screens/SideMenu/TermsandConditions';
import PrivacyPolicy from './Screens/SideMenu/PrivacyPolicy';
import ContactUs from './Screens/SideMenu/ContactUs';
import AboutUs from './Screens/SideMenu/AboutUs';
import { Manrope } from './Global/FontFamily';
import ProfileView from './Screens/ProfileScreens/ProfileView';
import MyCart from './Screens/Home/MyCart';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

LogBox.ignoreAllLogs;
export const navigationRef = React.createRef();

const MyDrawer = () => {
  const dispatch = useDispatch();


  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{ swipeEnabled: false }}
        // drawerContent={props => 
        // <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardOne"
            component={OnboardOne}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <MyDrawer />
    </Provider>
  );
};

const MainApp = () => {
  return (
    <>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OnboardOne"
          component={OnboardOne}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProfileView"
          component={ProfileView}
          options={({ navigation, route }) => ({
            headerTitle: 'Profile View',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: Color.black },
            headerStyle: { backgroundColor: Color.white },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
          name="MyCart"
          component={MyCart}
          options={({ navigation, route }) => ({
            headerTitle: 'My Cart',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: Color.black },
            headerStyle: { backgroundColor: Color.white },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
          name="TermsandConditions"
          component={TermsandConditions}
          options={({ navigation, route }) => ({
            headerTitle: 'Terms & Conditions',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: Color.black },
            headerStyle: { backgroundColor: Color.white, elevation: 1 },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
          options={({ navigation, route }) => ({
            headerTitle: 'Privacy Policy',
            headerTitleStyle: { color: Color.black },
            headerStyle: { backgroundColor: Color.white, elevation: 1 },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
          options={({ navigation, route }) => ({
            headerTitle: 'About Us',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
            headerStyle: { backgroundColor: Color.white },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
          options={({ navigation, route }) => ({
            headerTitle: 'Contact Us',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
            headerStyle: { backgroundColor: Color.white },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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

        {/* 
        <Stack.Screen
          name="category"
          component={CategoryScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Category',
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
          name="ProductList"
          component={ProductList}
          options={{headerShown: false}}
        />


        <Stack.Screen
          name="AddCard"
          component={AddCard}
          options={({navigation, route}) => ({
            headerTitle: 'Add Card Details',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.white,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={({navigation, route}) => ({
            headerTitle: 'My Orders',
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
          name="NotificationSettings"
          component={NotificationSettings}
          options={({navigation, route}) => ({
            headerTitle: 'Notification Settings',
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
          name="ProfileView"
          component={ProfileView}
          options={({navigation, route}) => ({
            headerTitle: 'Profile View',
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
        /> */}

      </Stack.Navigator>
    </>
  );
};

export default App;
