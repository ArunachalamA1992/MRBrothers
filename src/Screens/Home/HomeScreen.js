//import liraries
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Dimensions,
  LogBox,
  StatusBar,
  FlatList,
  PermissionsAndroid,
  Modal,
  NativeEventEmitter,
  NativeModules,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Color from '../../Global/Color';
import {useNavigation} from '@react-navigation/native';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Badge} from 'react-native-paper';
import {Manrope, Marcellus} from '../../Global/FontFamily';

import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Media} from '../../Global/Media';
import fetchData from '../../Config/fetchData';
import {useDispatch, useSelector} from 'react-redux';
import {setcart, setCartCount} from '../../Redux/user/UserAction';
import HomePage_Skeleton from '../../Components/skeleton/HomePage';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreAllLogs();
const {width} = Dimensions.get('window');
// create a component
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);
  const [Category_Data, setcategory_Data] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notificationcount, setNotificationcount] = useState(0);
  const [shopSection] = useState([
    {id: 1, title: 'banners', data: ['banners']},
    {id: 2, title: 'Category', data: ['Category']},
    {id: 3, title: 'hot deals', data: ['hot deals']},
    {id: 4, title: 'Trend Brands', data: ['Trend Brands']},
    {id: 5, title: 'Trend Product', data: ['Trend Product']},
    {id: 6, title: 'Offer Banner', data: ['Offer Banner']},
    {id: 7, title: 'Flash Selling', data: ['Flash Selling']},
    {id: 8, title: 'product', data: ['product']},
    {id: 9, title: 'Latest Product', data: ['Latest Product']},
    {id: 10, title: 'Featured Product', data: ['Featured Product']},
  ]);
  const [bannerData, setBannerData] = useState({});
  const [loader, setloader] = useState(true);

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //     setNetinfo(false);
  //   // }, 3000);
  //   Getbanner();
  //   get_Category_List();
  //   get_Cart_Count();
  //   Notification();
  // }, []);

  // const Getuserdata = async () => {
  //   try {
  //     // setloader(false);
  //     const User_Data = await AsyncStorage.getItem('User_Data');
  //     const value = JSON.parse(User_Data);
  //     console.log(value, 'value');
  //     if (value != null) {
  //       console.log('============>data<============', value?.userData);
  //       setuserdata(value?.userData);
  //       setloader(true);
  //     } else {
  //       setuserdata(null);
  //       setloader(true);
  //     }
  //   } catch (error) {
  //     setuserdata(null);
  //     setloader(false);
  //     console.log('Error getting Welcome_Screen: ', error);
  //   }
  // };
  const GetData = async () => {
    let userdata = await AsyncStorage.getItem('User_Data');
    console.log(userdata, '+++++');
  };
  // USE USEFOCUSEFFECT FUNCTION
  useFocusEffect(
    React.useCallback(() => {
      GetData();
      Getbanner();
      get_Category_List();
      get_Cart_Count();
      Notification();
      setloader(false);
      return () => {};
    }, []),
  );
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  const handleBackPress = () => {
    navigation.goBack();
    // console.log("Back button presseddddddddddddd");

    return true;
  };

  // GET CART COUNT :
  const get_Cart_Count = async () => {
    try {
      // const Cartcount = await Cart_List
      const Cartcount = await fetchData?.Cart_List();
      if (Cartcount?.success == true) {
        dispatch(setCartCount(Cartcount?.data?.length));
        dispatch(setcart(Cartcount));
      } else {
        if (Cartcount?.message == 'No Data found for this request') {
          dispatch(setCartCount(0));
          dispatch(setcart(null));
        } else {
          console.log('Failed To Get Cart');
        }
      }
    } catch (error) {
      console.log('catch in get_Cart_Count : ', error);
    }
  };
  // GET NOTIFICATION :
  const Notification = async () => {
    try {
      const notification = await fetchData?.NotificationCount();
      if (notification?.success == true) {
        setNotificationcount(notification?.data?.count);
      } else {
        setNotificationcount(0);
      }
    } catch (error) {
      console.log('catch in get_Notification : ', error);
    }
  };
  const fetchcategory = async () => {
    try {
      const CategoryList = await fetchData?.Category_List(page);
      if (CategoryList?.success == true) {
        setcategory_Data([...Category_Data, ...CategoryList?.data]);
        setPage(prevPage => prevPage + 1);
      } else {
        console.log('Failed To Get Cart', CategoryList);
      }
    } catch (error) {
      console.log('catch in get_Cart_Count : ', error);
    }
  };
  // GET CATEGORY LIST :
  const get_Category_List = async () => {
    try {
      // const Cartcount = await Cart_List
      const CategoryList = await fetchData?.Category_List(page);
      if (CategoryList?.success == true) {
        setcategory_Data(CategoryList?.data);
        setPage(prevPage => prevPage + 1);
      } else {
        setcategory_Data([]);
      }
    } catch (error) {
      console.log('catch in get_Cart_Count : ', error);
    }
  };
  // GET BANNER API :
  const Getbanner = async () => {
    try {
      const Get_Banner = await fetchData?.Get_Banner();
      console.log('________________________ :', Get_Banner);
      setBannerData(Get_Banner);
      // if (Get_Banner?.success == true) {
      //   console.log(Get_Banner, '{{{{{{{{{{');

      // } else {
      //   console.log(Get_Banner, '+');
      // }
    } catch (error) {
      console.log('catch in get banner', error);
    }
  };

  // USESELECTOR  FROM REDUX :
  const cart_count = useSelector(state => state.UserReducer.Cart_Count);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.primary} barStyle={'light-content'} />
      {netInfo_State ? null : (
        <Animated.View
          animation="fadeInRight"
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 9999,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#626262',
            opacity: 0.5,
            padding: 10,
            marginTop: Platform.OS == 'ios' ? 80 : 0,
          }}>
          <Text style={{color: 'white'}}>No Internet Connection</Text>
        </Animated.View>
      )}
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              width: '95%',
              // marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Image
                source={require('../../assets/Images/dash.png')}
                style={{width: 120, height: 100, resizeMode: 'contain'}}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyCart')}
                style={{paddingHorizontal: 10}}>
                {cart_count == 0 ? null : (
                  <Badge
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: -10,
                      right: 5,
                      backgroundColor: Color.red,
                      color: Color.white,
                      fontFamily: Manrope.Bold,
                      fontSize: 13,
                    }}>
                    {cart_count ? cart_count : 0}
                  </Badge>
                )}

                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'shoppingcart'}
                  icon_size={26}
                  icon_color={Color.black}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={() => navigation.navigate('NotificationScreen')}>
                {notificationcount == 0 ? null : (
                  <Badge
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: -10,
                      right: 5,
                      backgroundColor: Color.red,
                      color: Color.white,
                      fontFamily: Manrope.Bold,
                      fontSize: 13,
                    }}>
                    {notificationcount ? notificationcount : 0}
                  </Badge>
                )}
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'bell-o'}
                  icon_size={24}
                  icon_color={Color.black}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 0,
              marginBottom: 20,
              // backgroundColor: 'red',
            }}>
            <TouchableOpacity
              style={{
                width: '95%',
                height: 55,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 30,
                paddingHorizontal: 20,
                borderColor: Color.cloudyGrey,
                borderWidth: 0.5,
              }}
              onPress={() => navigation.navigate('SearchScreen')}>
              <Iconviewcomponent
                Icontag={'Feather'}
                iconname={'search'}
                icon_size={24}
                icon_color={Color.cloudyGrey}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.Venus,
                  fontFamily: Manrope.Regular,
                  letterSpacing: 0.5,
                  paddingHorizontal: 10,
                }}>
                Search Category / Product
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loader == true ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size="large" color={Color.primary} />
          </View>
        ) : (
          <Animated.SectionList
            sections={shopSection}
            scrollEnabled={true}
            keyExtractor={(item, index) => item + index}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            nestedScrollEnabled
            initialNumToRender={5}
            renderItem={({item}) => {
              switch (item) {
                case 'banners':
                  return (
                    <View
                      style={{
                        width: width,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {/* <SwiperFlatList
                      autoplay
                      autoplayDelay={5}
                      autoplayLoop
                      index={1}
                      showPagination
                      data={bannerData}
                      paginationActiveColor={Color.primary}
                      paginationStyleItem={{
                        width: 15,
                        height: 3,
                        marginTop: 30,
                        marginHorizontal: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      renderItem={({ item }) => (
                        <TouchableOpacity>
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              width: width - 10,
                              height: 160,
                              borderRadius: 5,
                              resizeMode: 'cover',
                              marginHorizontal: 5,
                            }}
                          />
                        </TouchableOpacity>
                      )
                      }
                    /> */}

                      <SwiperFlatList
                        autoplay
                        autoplayDelay={5}
                        autoplayLoop
                        index={0}
                        showPagination={bannerData?.data?.length > 1}
                        paginationActiveColor={Color?.primary}
                        // paginationStyle={{
                        //   width: 1,
                        //   height: 1,
                        //   marginTop: 30,
                        //   marginHorizontal: 2,
                        //   justifyContent: 'center',
                        //   alignItems: 'center',
                        // }}
                        paginationStyleItem={{
                          width: 6,
                          height: 6,
                          marginTop: 30,
                          marginHorizontal: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        paginationDefaultColor="#ccc"
                        data={bannerData?.data} // Use the data array from the response
                        renderItem={({item}) => (
                          <View style={styles?.child}>
                            <Image
                              source={{uri: item?.image}} // Make sure to access the `image` field correctly
                              style={styles?.image}
                            />
                          </View>
                        )}
                      />
                    </View>
                  );
                case 'Category':
                  return (
                    <View
                      style={{
                        flex: 1,
                        height: height,
                        marginVertical: 20,
                        marginBottom: 50,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '95%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 24,
                              color: Color.black,
                              fontFamily: Marcellus?.Marcellus_Regular,
                              letterSpacing: 0.5,
                              fontWeight: '400',
                            }}>
                            Our Collections
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.white,
                              backgroundColor: '#AB0000',
                              marginHorizontal: 10,
                              fontFamily: Manrope.Medium,
                              paddingHorizontal: 15,
                              padding: 5,
                              borderRadius: 30,
                            }}>
                            New
                          </Text>
                        </View>
                        {/* <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                                                <Text style={{ fontSize: 12, color: Color.lightBlack, textDecorationLine: 'underline' }}>See All</Text>
                                            </TouchableOpacity> */}
                      </View>
                      <View
                        style={{
                          width: scr_width,
                          height: '100%',
                          marginBottom: scr_height * 0.1,
                        }}>
                        <FlatList
                          data={Category_Data}
                          keyExtractor={(item, index) => item + index}
                          numColumns={2}
                          columnWrapperStyle={styles.row}
                          renderItem={({item, index}) => {
                            console.log('=====ee===>', item?.image);

                            return (
                              <TouchableOpacity
                                // onPress={() => navigation.navigate("ProductListing",{CategoryList:item})}
                                onPress={() =>
                                  navigation.navigate('SelectCategory', {
                                    CategoryList: item,
                                  })
                                }
                                style={{
                                  width: width / 2 - 20,
                                  height: 190,
                                  margin: 5,
                                  // backgroundColor: 'red',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  // borderRadius: 10,
                                }}>
                                <View
                                  style={{
                                    width: 162,
                                    height: 145,
                                    borderRadius: 10,
                                    backgroundColor: Color.softGrey,
                                  }}>
                                  <Image
                                    source={{uri: item?.image}}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      resizeMode: 'cover',
                                      borderRadius: 10,
                                    }}
                                  />
                                </View>
                                <View
                                  style={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      color: Color.black,
                                      font: Manrope.Medium,
                                      marginVertical: 10,
                                      fontWeight: '500',
                                      textTransform: 'capitalize',
                                    }}>
                                    {item?.name}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            );
                          }}
                          onEndReached={fetchcategory}
                          onEndReachedThreshold={0.5}
                          ListFooterComponent={
                            loading && page !== 1 ? (
                              <ActivityIndicator
                                size="large"
                                color={Color?.primary}
                              />
                            ) : null
                          }
                          style={{margin: 5}}
                        />
                      </View>
                    </View>
                  );
                // case 'Trend Brands':
                //     return (
                //         <Text>Test</Text>
                //     );
                // case 'Trend Product':
                //     return (
                //         <Text>Test</Text>
                //     );
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: scr_width,
    height: scr_height,
    backgroundColor: Color.white,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  child: {
    width, // Take the width of the screen for each slide
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 20, // Set image width slightly less than screen width
    height: 164, // Set image height
    borderRadius: 10, // Optional, to give rounded corners
    resizeMode: 'contain', // Resize the image to cover the entire space
  },
});

//make this component available to the app
export default HomeScreen;
