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
} from 'react-native';

import Color from '../../../Global/Color';
import {Iconviewcomponent} from '../../../Components/Icontag';
import {Manrope} from '../../../Global/FontFamily';
import {scr_height, scr_width} from '../../../Utils/Dimensions';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Badge} from 'react-native-paper';
import fetchData from '../../../Config/fetchData';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

// create a component
const MyOrders = ({navigation}) => {
  const cart_count = useSelector(state => state.UserReducer.Cart_Count);
  const [Search, setSearch] = useState('');
  const [height, setHeight] = useState(undefined);
  const [Myorder, setmyorder] = useState([]);
  const [shopSection] = useState([
    {id: 1, title: 'banners', data: ['banners']},
    {id: 2, title: 'Category', data: ['Category']},
  ]);

  const [filterData, setFilterData] = useState([
    {
      id: '0',
      filter_name: 'placed',
    },
    {
      id: '1',
      filter_name: 'Processing',
    },
    {
      id: '2',
      filter_name: 'rejected',
    },
    {
      id: '3',
      filter_name: 'Cancelled',
    },
  ]);
  const [notificationcount, setNotificationcount] = useState(0);
  const [selectItem, setSelectItem] = useState('0');

  const selectedItem = item => {
    try {
      setSelectItem(item.id);
      GetMyOrders(item?.id);
    } catch (error) {
      console.log('catch in selected_Item : ', error);
    }
  };
  // GET MY ORDERS API FUNCTION :
  const GetMyOrders = async order => {
    try {
      let value = 'placed';
      if (order == 1) {
        value = 'processed';
      } else if (order == 2) {
        value = 'rejected';
      } else if (order == 3) {
        value = 'cancelled';
      } else {
        value = 'placed';
      }
      const MyOrders = await fetchData?.MyOrders(value);
      if (MyOrders?.success == true) {
        setmyorder(MyOrders?.data);
      } else {
        setmyorder([]);
        console.log('Failed To Get My Orders', MyOrders);
      }
    } catch (error) {
      console.log('catch in GetMyOrders : ', error);
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

  useEffect(() => {
    GetMyOrders(filterData?.id);
    Notification();
  }, []);

  // USE USEFOCUSEFFECT FUNCTION
  useFocusEffect(
    React.useCallback(() => {
      GetMyOrders(filterData?.id);
      Notification();
      setSearch('');
      setSelectItem('0');
      return () => {};
    }, []),
  );
  // calculate total quantity :
  // const gettotalquantity = async item => {
  //   if (!item) return '0 g';
  //   console.log('dd', item);
  //   const data = item;
  //   let totalQuantity = 0;

  //   await data?.map(datas => {
  //     if (datas) {
  //       totalQuantity += datas?.quantity;
  //     }
  //   });

  //   if (totalQuantity === 0) {
  //     console.log('wwwww');

  //     return '0 Item';
  //   } else if (totalQuantity === 1) {
  //     console.log('gggg');
  //     console.log(totalQuantity, 'gggg');
  //     return '1 Item';
  //   } else {
  //     console.log('llll');
  //     console.log(totalQuantity, 'kkkkk');
  //     return `${totalQuantity} Items`;
  //   }
  // };
  // const gettotalWeight = async item => {
  //   if (!item) return '0 g';
  //   console.log('dd', item);
  //   const data = item;
  //   let totalweight = 0;

  //   await data?.map(datas => {
  //     if (datas) {
  //       const weightVariant = parseInt(datas?.weight_variant, 10); // convert to integer
  //       if (!isNaN(weightVariant)) {
  //         // check if conversion was successful
  //         console.log('weightVariant', weightVariant);

  //         totalweight += weightVariant;
  //       }
  //     }
  //   });

  //   if (totalweight === 0) {
  //     console.log('wwwww');
  //     return '0 g';
  //   } else if (totalweight === 1) {
  //     console.log('gggg');
  //     console.log(totalweight, 'gggg');
  //     return '1 g';
  //   } else {
  //     console.log('llll');
  //     console.log(totalweight, 'lll');
  //     return `${totalweight} g`;
  //   }
  // };

  // SEARCH FUNCTION
  const Searchfunction = async (text, order) => {
    try {
      console.log('search', text);
      let value = 'placed';
      if (order == 1) {
        value = 'processed';
      } else if (order == 2) {
        value = 'rejected';
      } else if (order == 3) {
        value = 'cancelled';
      } else {
        value = 'placed';
      }
      console.log(value, 'value');
      console.log(text, 'search');
      if (text == '') {
        GetMyOrders(order);
      }
      const Searchdata = await fetchData?.Get_Order_Search_Data(text, value);
      if (Searchdata?.success == true) {
        setmyorder(Searchdata?.data);
        console.log(Searchdata?.data, 'data');
      } else {
        setmyorder([]);
      }
    } catch (error) {
      console.log('catch in Searchfunction : ', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor={Color.primary}
        translucent={false}
        barStyle="light-content"
        networkActivityIndicatorVisible={true}
      />
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View
          style={{
            width: '100%',
            height: 60,
            elevation: 1,
            backgroundColor: Color.white,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingHorizontal: 10}}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'left'}
                icon_size={24}
                icon_color={Color.black}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: Color.black,
                fontWeight: '500',
                fontFamily: Manrope.Medium,
              }}>
              My Orders
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{paddingHorizontal: 20}}
              onPress={() => navigation.navigate('MyCart')}>
              {cart_count == 0 ? null : (
                <Badge
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: -15,
                    right: 15,
                    backgroundColor: Color.red,
                    color: Color.white,
                    fontFamily: Manrope.Bold,
                    fontSize: 13,
                  }}>
                  {cart_count ? cart_count : 0}
                </Badge>
              )}

              <Iconviewcomponent
                Icontag={'Feather'}
                iconname={'shopping-cart'}
                icon_size={22}
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
            width: '90%',
            alignItems: 'center',
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 55,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 30,
              paddingHorizontal: 20,
              borderColor: Color.cloudyGrey,
              borderWidth: 0.5,
            }}>
            <TextInput
              placeholder="Search in orders"
              placeholderTextColor={Color.cloudyGrey}
              style={{
                flex: 1,
                fontSize: 14,
                fontFamily: Manrope.Regular,
                color: '#888888',
                textTransform: 'capitalize',
              }}
              value={Search}
              onChangeText={text => {
                setSearch(text), Searchfunction(text, selectItem);
              }}
            />
            {/* <View style={{backgroundColor: 'red'}}> */}
            <Iconviewcomponent
              Icontag={'Feather'}
              iconname={'search'}
              icon_size={24}
              icon_color={Color.primary}
            />
            {/* </View> */}
          </TouchableOpacity>
        </View>
        <View style={{width: scr_width, paddingVertical: 10}}>
          <FlatList
            data={filterData}
            keyExtractor={(item, index) => item + index}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              var selectItemBg =
                selectItem === item.id ? Color.primary : Color.white;
              return (
                <TouchableOpacity
                  onPress={() => {
                    selectedItem(item);
                  }}
                  style={{
                    margin: 5,
                    justifyContent: 'center',
                    paddingHorizontal: 25,
                    padding: 5,
                    borderRadius: 30,
                    alignItems: 'center',
                    backgroundColor: selectItemBg,
                    borderColor: Color.primary,
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: selectItem === item.id ? Color.white : Color.black,
                      font: Manrope.Bold,
                      paddingVertical: 5,
                      textTransform: 'capitalize',
                    }}>
                    {item?.filter_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            style={{margin: 5}}
          />
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
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
                        width: '100%',
                        height: height,
                        alignItems: 'center',
                      }}>
                      <FlatList
                        data={Myorder}
                        keyExtractor={(item, index) => item + index}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => {
                          return (
                            <View
                              style={{
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: Color.black,
                                  font: Manrope.Bold,
                                  textTransform: 'capitalize',
                                }}>
                                No Orders Found
                              </Text>
                            </View>
                          );
                        }}
                        renderItem={({item, index}) => {
                          // console.log(
                          //   'ddddssssssssssddddddddddd',
                          //   item?.products[0]?.product_id?.product_code,
                          // );

                          return (
                            // <View
                            //   style={{
                            //     width:scr_width/1.05,
                            //     margin: 5,
                            //     elevation: 3,
                            //     marginVertical: 10,
                            //     backgroundColor: Color.white,
                            //   }}>
                            //   <View
                            //     style={{width: '100%', flexDirection: 'row'}}>
                            //     <TouchableOpacity
                            //       style={{
                            //         flex: 2,
                            //         justifyContent: 'center',
                            //         alignItems: 'center',
                            //         borderRadius: 5,
                            //       }}>
                            //       <Image
                            //         source={{uri:item?.products[0]?.product_id?.images[0]}}
                            //         // source={require('../../../assets/Images/earing.png')}
                            //         style={{
                            //           width: 120,
                            //           height: 130,
                            //           resizeMode: 'contain',
                            //           borderRadius: 5,
                            //         }}
                            //       />
                            //     </TouchableOpacity>
                            //     <View
                            //       style={{
                            //         flex: 3,
                            //         justifyContent: 'flex-start',
                            //         alignItems: 'flex-start',
                            //         paddingHorizontal: 10,
                            //       }}>
                            //       <Text
                            //         style={{
                            //           fontSize: 16,
                            //           color: Color.black,
                            //           font: Manrope.Bold,
                            //           paddingVertical: 3,
                            //           textTransform:'capitalize'
                            //         }}
                            //         numberOfLines={2}>
                            //         {item?.products[0]?.product_id?.name}
                            //       </Text>
                            //       <Text
                            //         style={{
                            //           fontSize: 13,
                            //           color: Color.cloudyGrey,
                            //           fontFamily: Manrope.Medium,
                            //           paddingVertical: 3,
                            //         }}
                            //         numberOfLines={1}>
                            //         Product-ID:
                            //         <Text
                            //           style={{
                            //             fontSize: 14,
                            //             color: Color.black,
                            //             fontFamily: Manrope.SemiBold,
                            //           }}
                            //           >
                            //            {item?.products[0]?.product_id?._id}
                            //         </Text>
                            //       </Text>
                            //       <Text
                            //         style={{
                            //           fontSize: 13,
                            //           color: Color.cloudyGrey,
                            //           fontFamily: Manrope.Medium,
                            //           paddingVertical: 3,
                            //         }}
                            //         numberOfLines={1}>
                            //         Quantity -
                            //         <Text
                            //           style={{
                            //             fontSize: 14,
                            //             color: Color.lightBlack,
                            //             fontFamily: Manrope.SemiBold,
                            //           }}>
                            //            {item?.products[0]?.quantity ? item?.products[0]?.quantity + " item" : item?.products[0]?.quantity+" items"}
                            //         </Text>
                            //       </Text>
                            //       {/* <Text
                            //         style={{
                            //           fontSize: 14,
                            //           color: Color?.primary,
                            //           fontFamily: Manrope.SemiBold,
                            //           borderColor: Color.primary,
                            //           borderWidth: 0.5,
                            //           borderRadius: 30,
                            //           paddingHorizontal: 20,
                            //           paddingVertical: 5,
                            //           marginVertical: 5,
                            //           textTransform:'capitalize'
                            //         }}
                            //         numberOfLines={1}>
                            //         {item?.status}
                            //       </Text> */}
                            //     </View>
                            //   </View>
                            //   <View
                            //     style={{
                            //       width: '100%',
                            //       flexDirection: 'row',
                            //       justifyContent: 'space-between',
                            //       alignItems: 'center',
                            //       paddingHorizontal: 5,
                            //       paddingVertical: 15,
                            //     }}>
                            //     <View
                            //       style={{
                            //         flex: 1.5,
                            //         justifyContent: 'flex-start',
                            //         alignItems: 'flex-start',
                            //         paddingHorizontal: 20,
                            //       }}>
                            //       <Text
                            //         style={{
                            //           fontSize: 13,
                            //           color: Color.cloudyGrey,
                            //           fontFamily: Manrope.Medium,
                            //         }}>
                            //         Order-ID
                            //       </Text>
                            //       <Text
                            //         style={{
                            //           fontSize: 14,
                            //           color: Color.lightBlack,
                            //           fontFamily: Manrope.SemiBold,
                            //         }}
                            //         numberOfLines={1}>
                            //          {item?.order_id}
                            //       </Text>
                            //     </View>
                            //     <View
                            //       style={{
                            //         flex: 2,
                            //         justifyContent: 'flex-end',
                            //         alignItems: 'flex-end',
                            //         paddingHorizontal: 20,
                            //       }}>
                            //       {/* <TouchableOpacity
                            //         style={{
                            //           paddingHorizontal: 30,
                            //           paddingVertical: 10,
                            //           backgroundColor: Color.primary,
                            //           borderRadius: 30,
                            //         }}>
                            //         <Text
                            //           style={{
                            //             fontSize: 13,
                            //             color: Color.white,
                            //             fontFamily: Manrope.Medium,
                            //           }}>
                            //           Download invoice
                            //         </Text>
                            //       </TouchableOpacity> */}
                            //     </View>
                            //   </View>
                            // </View>
                            <TouchableOpacity
                              style={{
                                width: scr_width / 1.05,
                                margin: 5,
                                elevation: 3,
                                marginVertical: 10,
                                backgroundColor: Color.white,
                                padding: 10,
                              }}
                              onPress={() =>
                                navigation.navigate('OrderSummary', {
                                  OrderData: item?._id,
                                })
                              }>
                              <View
                                style={{width: '100%', flexDirection: 'row'}}>
                                <View
                                  style={{
                                    flex: 1.5,
                                    width: 180,
                                    height: 120,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    source={{
                                      uri: item?.products[0]?.product_id
                                        ?.images[0],
                                    }}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      resizeMode: 'cover',
                                      borderRadius: 5,
                                    }}
                                  />
                                </View>
                                <View
                                  style={{
                                    flex: 3,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                  }}>
                                  <View style={{padding: 10}}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        color: Color.black,
                                        font: Manrope.Bold,
                                        textTransform: 'capitalize',
                                        width: scr_width / 1.8,
                                        paddingVertical: 3,
                                      }}
                                      numberOfLines={2}>
                                      {item?.products[0]?.product_id?.name}
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                      <Text
                                        style={{
                                          color: '#999999',
                                          fontSize: 12,
                                          fontFamily: Manrope?.Regular,
                                        }}>
                                        Product ID{' '}
                                      </Text>
                                      <Text
                                        style={{
                                          color: '#999999',
                                          fontSize: 12,
                                          fontFamily: Manrope?.Regular,
                                        }}>
                                        {`#${item?.products[0]?.product_id?.product_code}`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{flexDirection: 'row', gap: 5}}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: Color.cloudyGrey,
                                          fontFamily: Manrope.Regular,
                                        }}>
                                        Quantity -
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          color: Color?.lightBlack,
                                          fontFamily: Manrope.SemiBold,
                                          width: scr_width / 2.5,
                                        }}
                                        numberOfLines={1}>
                                        {`${
                                          item?.products?.reduce(
                                            (a, b) => a + b.quantity,
                                            0,
                                          ) ?? 0
                                        } Items`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{flexDirection: 'row', gap: 5}}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: Color.cloudyGrey,
                                          fontFamily: Manrope.Regular,
                                        }}>
                                        Weight -
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          color: Color?.lightBlack,
                                          fontFamily: Manrope.SemiBold,
                                          width: scr_width / 2.5,
                                        }}
                                        numberOfLines={1}>
                                        {`${
                                          item?.products.every(
                                            a =>
                                              a.weight_variant !== null &&
                                              !isNaN(a.weight_variant),
                                          )
                                            ? item?.products?.reduce(
                                                (a, b) =>
                                                  a +
                                                  parseFloat(b.weight_variant),
                                                0,
                                              ) ?? 0
                                            : 0
                                        } g`}{' '}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  margin: 7,
                                  gap: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Regular,
                                  }}>
                                  Order ID -
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    color: Color?.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    width: scr_width / 1.4,
                                    // backgroundColor:'red'
                                  }}
                                  numberOfLines={1}>
                                  {item?.order_id}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                        style={{width: '100%'}}
                      />
                    </View>
                  );
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
});

//make this component available to the app
export default MyOrders;
