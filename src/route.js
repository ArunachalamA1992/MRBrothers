import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {setDataCount, setUserData} from './Redux';
import HomeScreen from './Screens/Home/HomeScreen';
import Color from './Global/Color';
import {Manrope} from './Global/FontFamily';
import ProductDetails from './Screens/Home/ProductDetails';
import AboutUs from './Screens/SideMenu/AboutUs';
import ContactUs from './Screens/SideMenu/ContactUs';
import TermsandConditions from './Screens/SideMenu/TermsandConditions';
import PrivacyPolicy from './Screens/SideMenu/PrivacyPolicy';
import MyOrders from './Screens/Home/BottomTabs/MyOrders';
import Profile from './Screens/Home/BottomTabs/Profile';
import Login from './Screens/Auth/Login';
import OTPScreen from './Screens/Auth/OTPScreen';
import {Iconviewcomponent} from './Components/Icontag';
import Register from './Screens/Auth/Register';
import StoreRegister from './Screens/Auth/StoreRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductListing from './Screens/Home/ProductListing';
import OrderSummary from './Screens/Home/OrderSummary';
import OnboardOne from './Screens/OnboardScreens/OnboardOne';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
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
      /> */}

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
        name="TermsandConditions"
        component={TermsandConditions}
        options={({navigation, route}) => ({
          headerTitle: 'Terms & Conditions',
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
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({navigation, route}) => ({
          headerTitle: 'Privacy Policy',
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
    </Stack.Navigator>
  );
};

export const MyOrderStack = () => {
  const notificationCount = useSelector(
    state => state.UserReducer.notificationCount,
  );
  return (
    <Stack.Navigator initialRouteName="MyOrder">
      <Stack.Screen
        name="MyOrder"
        component={MyOrders}
        options={{headerShown: false}}
        // options={({ navigation }) => ({
        //   headerTitle: 'My Orders',
        //   headerTitleAlign: 'center',
        //   headerTitleStyle: {
        //     color: Color.black,
        //     fontFamily: Manrope.Bold,
        //     fontSize: 18, elevation: 0.5
        //   },
        //   headerStyle: { backgroundColor: Color.white, elevation: 0.5 },
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
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const notificationCount = useSelector(
    state => state.UserReducer.notificationCount,
  );
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
        // options={({ navigation }) => ({
        //   headerTitle: 'My Account',
        //   headerTitleAlign: 'center',
        //   headerTitleStyle: {
        //     color: Color.black,
        //     fontFamily: Manrope.Bold,
        //     fontSize: 18,
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
    </Stack.Navigator>
  );
};

// export const Auth = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: true}}>
//       <Stack.Screen
//         name="OnboardOne"
//         component={OnboardOne}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Register"
//         component={Register}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="StoreRegister"
//         component={StoreRegister}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="OTPScreen"
//         component={OTPScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="TermsandConditions"
//         component={TermsandConditions}
//         options={({navigation, route}) => ({
//           headerTitle: 'Terms & Conditions',
//           headerTitleAlign: 'center',
//           headerTitleStyle: {color: Color.black},
//           headerStyle: {backgroundColor: Color.white, elevation: 1},
//           headerLeft: () => (
//             <View style={{marginHorizontal: 10}}>
//               <Icon
//                 name="arrow-back"
//                 size={30}
//                 color={Color.black}
//                 onPress={() => navigation.goBack()}
//               />
//             </View>
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="PrivacyPolicy"
//         component={PrivacyPolicy}
//         options={({navigation, route}) => ({
//           headerTitle: 'Privacy Policy',
//           headerTitleStyle: {color: Color.black},
//           headerStyle: {backgroundColor: Color.white, elevation: 1},
//           headerLeft: () => (
//             <View style={{marginHorizontal: 10}}>
//               <Icon
//                 name="arrow-back"
//                 size={30}
//                 color={Color.black}
//                 onPress={() => navigation.goBack()}
//               />
//             </View>
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="AboutUs"
//         component={AboutUs}
//         options={({navigation, route}) => ({
//           headerTitle: 'About Us',
//           headerTitleAlign: 'center',
//           headerTitleStyle: {
//             color: Color.black,
//             fontSize: 18,
//             fontFamily: Manrope.Bold,
//           },
//           headerStyle: {backgroundColor: Color.white},
//           headerLeft: () => (
//             <View style={{marginHorizontal: 10}}>
//               <Icon
//                 name="arrow-back"
//                 size={30}
//                 color={Color.black}
//                 onPress={() => navigation.goBack()}
//               />
//             </View>
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="ContactUs"
//         component={ContactUs}
//         options={({navigation, route}) => ({
//           headerTitle: 'Contact Us',
//           headerTitleAlign: 'center',
//           headerTitleStyle: {
//             color: Color.black,
//             fontSize: 18,
//             fontFamily: Manrope.Bold,
//           },
//           headerStyle: {backgroundColor: Color.white},
//           headerLeft: () => (
//             <View style={{marginHorizontal: 10}}>
//               <Icon
//                 name="arrow-back"
//                 size={30}
//                 color={Color.black}
//                 onPress={() => navigation.goBack()}
//               />
//             </View>
//           ),
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

const TabNavigator = () => {
  const userData = useSelector(state => state.UserReducer.userData);
  const dispatch = useDispatch();
  // const userdetails = async()=>{
  //   const User_Data = await AsyncStorage.getItem('User_Data');
  //   console.log("userData",User_Data);
  //   dispatch(setUserData(JSON.parse(User_Data)))
  // }
  // useEffect(() => {
  //   userdetails()
  // }, [])
  // var {token} = userData;
  // const dataCount = useSelector(state => state.UserReducer.count);
  // var { wishlist, cart } = dataCount;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {height: 55},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route?.name === 'HomeTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'home'}
                    icon_size={25}
                    icon_color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Home
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Iconviewcomponent
                  Icontag={'MaterialCommunityIcons'}
                  iconname={'home-outline'}
                  icon_size={25}
                  icon_color={'#999999'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Home
                </Text>
              </View>
            );
          } else if (route?.name === 'MyOrderTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'bag-handle'}
                    icon_size={25}
                    icon_color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Orders
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'bag-handle-outline'}
                  icon_size={22}
                  icon_color={'#999999'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Orders
                </Text>
              </View>
            );
          } else if (route?.name === 'ProfileTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome'}
                    iconname={'user'}
                    icon_size={25}
                    icon_color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Profile
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'user-o'}
                  icon_size={22}
                  icon_color={'#999999'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Profile
                </Text>
              </View>
            );
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.smokeyGrey,
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MyOrderTab"
        component={MyOrderStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
