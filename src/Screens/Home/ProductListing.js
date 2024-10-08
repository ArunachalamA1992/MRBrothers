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
  RefreshControl,
  LogBox,
  StatusBar,
  FlatList,
  PermissionsAndroid,
  Modal,
  NativeEventEmitter,
  NativeModules,
  TextInput,
  ImageBackground,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Color from '../../Global/Color';
import {useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Manrope} from '../../Global/FontFamily';
import {Badge} from 'react-native-paper';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useDispatch, useSelector} from 'react-redux';
import fetchData from '../../Config/fetchData';
import {setcart, setCartCount} from '../../Redux/user/UserAction';
import {useFocusEffect} from '@react-navigation/native';

const ProductListing = ({route, navigation}) => {
  const cart_count = useSelector(state => state.UserReducer.Cart_Count);
  const cart_Data = useSelector(state => state.UserReducer.cart);
  console.log('cart_Data', cart_Data);
  console.log('cart_Data', cart_count);
  const dispatch = useDispatch();
  const {width} = Dimensions.get('window');
  const [height, setHeight] = useState(undefined);
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectItem, setSelectItem] = useState('0');
  const [refreshing, setRefreshing] = useState(false);
  const CategoryData = route.params;
  // const [loader, setloader] = useState(false);
  const [notificationcount, setNotificationcount] = useState(0);
  const [filterData, setFilterData] = useState([
    {
      id: '0',
      filter_name: 'Men',
    },
    {
      id: '1',
      filter_name: 'Women',
    },

    {
      id: '2',
      filter_name: 'Couple',
    },
    {
      id: '3',
      filter_name: 'Kids',
    },
  ]);
  const [shopSection] = useState([
    {id: 2, title: 'Category', data: ['Category']},
  ]);
  const [categoryData, setCategoryData] = useState([]);
  // GET PRODUCT LIST FUNCTION
  const GetProductList = async (id, category) => {
    let value = 'men';
    if (category == 1) {
      value = 'women';
    } else if (category == 2) {
      value = 'couples';
    } else if (category == 3) {
      value = 'kids';
    } else {
      value = 'men';
    }
    try {
      const Product_Details = await fetchData?.Product_List(id, value);
      if (Product_Details?.success == true) {
        setCategoryData(Product_Details?.data);
        get_Cart_Count();
      } else {
        setCategoryData([]);
        console.log('Failed To Get Product List', Product_Details);
      }
    } catch (error) {
      console.log('catch in GetProductList : ', error);
    }
  };
  // USE EFFECT IN GET PRODUCT LIST
  // useEffect(() => {
  //   GetProductList(CategoryData?.CategoryList?._id, selectItem);
  //   Notification();
  // }, []);

  // USE FOCUSEFFECT IN GET PRODUCT LIST
  useFocusEffect(
    React.useCallback(() => {
      GetProductList(CategoryData?.CategoryList?._id, selectItem);
      Notification();
      return () => {};
    }, []),
  );
  // SELECT THE CATEGORY (WOMEN, MEN, KIDS)
  const selectedItem = item => {
    try {
      setSelectItem(item.id);
      GetProductList(CategoryData?.CategoryList?._id, item?.id);
    } catch (error) {
      console.log('catch in selected_Item : ', error);
    }
  };
  // ADD TO CART FUNCTION
  const AddToCart = async item => {
    console.log('AddToCart : ', item?.weight_variant);
    try {
      const data = {
        product_id: item?._id,
        quantity: 1,
      };
      if (item?.size_variants) {
        data.size_variant = item?.size_variants[0];
      }
      if (item?.weight_variants) {
        data.weight_variant = item?.weight_variants[0];
      }
      if (item?.purity_variants) {
        data.purity_variant = item?.purity_variants[0];
      }

      console.log('@@@@@@@@@@@@@@EEE ', data);
      const CART_FUNCTION = await fetchData?.New_Add_To_Cart(data);
      if (CART_FUNCTION?.success == true) {
        GetProductList(CategoryData?.CategoryList?._id, selectItem);
        get_Cart_Count();
      } else {
        if (CART_FUNCTION?.success == false) {
          if (CART_FUNCTION?.message == 'Cart already exist') {
            ToastAndroid.show(CART_FUNCTION?.message, ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
          }
        }
      }
    } catch (error) {
      console.log('catch in AddToCart : ', error);
    }
  };

  // Cart Count Api :
  const get_Cart_Count = async () => {
    try {
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
  // NOTIFICATION Count Api :
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

  // UPDATE THE CART FUNCTION
  // const updateCart = async item => {
  //   console.log('updateCart : ', item);
  //   try {
  //     console.log('SSSSSS');
  //   } catch (error) {
  //     ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  //     console.log('catch in updateCart : ', error);
  //   }
  // };

  // Delete Api In Cart
  const deleteApi = async item => {
    try {
      const DeleteCart = await fetchData?.Delete_Cart(item?.in_cart?.id);
      if (DeleteCart?.success == true) {
        GetProductList(CategoryData?.CategoryList?._id, selectItem);
        ToastAndroid.show(
          'successfully!! ,Item Removed from Cart',
          ToastAndroid.SHORT,
        );
        get_Cart_Count();
      } else {
        console.log('Failed To Delete Cart');
      }
    } catch (error) {
      console.log('catch in deleteApi : ', error);
    }
  };

  // Remove Cart
  const removeCart = async item => {
    try {
      const Quantity = item?.in_cart?.quantity - 1;
      if (Quantity == 0) {
        deleteApi(item);
      } else {
        const data = {
          quantity: Quantity,
        };
        const Cart_item_Update = await fetchData?.Add_To_Cart(
          data,
          item?.in_cart?.id,
        );
        if (Cart_item_Update?.success == true) {
          GetProductList(CategoryData?.CategoryList?._id, selectItem);
        } else {
          console.log('Failed To Add To Cart');
        }
      }
    } catch (error) {
      console.log('catch in removeCart : ', error);
    }
  };

  // Add To Cart
  const AddToCartApi = async item => {
    try {
      const Quantity = item?.in_cart?.quantity + 1;
      const data = {
        quantity: Quantity,
      };
      const Cart_item_Update = await fetchData?.Add_To_Cart(
        data,
        item?.in_cart?.id,
      );
      if (Cart_item_Update?.success == true) {
        GetProductList(CategoryData?.CategoryList?._id, selectItem);
      } else {
        console.log('Failed To Add To Cart');
      }
    } catch (error) {
      console.log('catch in AddToCart : ', error);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetProductList(CategoryData?.CategoryList?._id, selectItem);
    Notification();
    setSelectItem('0');
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor={Color.primary}
        translucent={false}
        barStyle="light-content"
        networkActivityIndicatorVisible={true}
      />
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
      <View>
        <View style={{flex: 1}}>
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
                  iconname={'arrowleft'}
                  icon_size={24}
                  icon_color={Color.black}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                }}>
                {CategoryData?.CategoryList?.name}
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
          <View style={{width: scr_width}}>
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
                      paddingHorizontal: 35,
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
                        color:
                          selectItem === item.id ? Color.white : Color.black,
                        font: Manrope.Bold,
                        paddingVertical: 5,
                      }}>
                      {item?.filter_name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              style={{margin: 5}}
            />
          </View>
          <View>
            <Animated.SectionList
              sections={shopSection}
              scrollEnabled={true}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={1}
              nestedScrollEnabled
              initialNumToRender={5}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[Color.primary, Color?.blue, Color?.gold]}
                />
              }
              renderItem={({item}) => {
                switch (item) {
                  case 'Category':
                    return (
                      <View
                        style={{
                          flex: 1,
                          height: height,
                          // marginVertical: 20,
                          alignItems: 'center',
                        }}>
                        {/* <View
                              style={{
                                width: '95%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                                                      <Text style={{ fontSize: 12, color: Color.lightBlack, textDecorationLine: 'underline' }}>See All</Text>
                                                  </TouchableOpacity> 
                            </View> */}
                        <View
                          style={{
                            width: scr_width,
                            height: 'auto',
                            marginBottom: scr_height * 0.18,
                          }}>
                          {categoryData?.length == 0 ? (
                            <View
                              style={{
                                flex: 1,
                                width: scr_width,
                                height: scr_height / 1.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: Color.primary,
                                  fontFamily: Manrope.SemiBold,
                                }}>
                                No Product Found
                              </Text>
                            </View>
                          ) : (
                            <FlatList
                              data={categoryData}
                              keyExtractor={(item, index) => item + index}
                              numColumns={2}
                              columnWrapperStyle={styles.row}
                              ItemSeparatorComponent={() => (
                                <View style={{padding: 5}} />
                              )}
                              renderItem={({item, index}) => {
                                return (
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('ProductDetails', {
                                        Productdata: item?._id,
                                      })
                                    }
                                    style={{
                                      width: scr_width / 2.15,
                                      borderWidth: 1,
                                      borderColor: '#EEEEEE',
                                      borderRadius: (50, 50, 10, 10),
                                      justifyContent: 'space-between',
                                      marginRight: 10,
                                    }}>
                                    <View>
                                      <Image
                                        source={{uri: item?.images[0]}}
                                        style={{
                                          width: scr_width / 2.2,
                                          height: scr_height / 4.95,
                                          resizeMode: 'contain',
                                          borderRadius: 10,
                                        }}
                                      />
                                      <View
                                        style={{
                                          gap: 10,
                                          padding: 5,
                                          flex: 1,
                                        }}>
                                        <View
                                          style={{
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            gap: 3,
                                            paddingLeft: 10,
                                          }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              color: Color.black,
                                              font: Manrope.Regular,
                                            }}>
                                            {item?.name
                                              ? item?.name?.length > 19
                                                ? `${item?.name.slice(
                                                    0,
                                                    19,
                                                  )}...`
                                                : item?.name
                                              : null}
                                          </Text>
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: '#999999',
                                              font: Manrope.Regular,
                                            }}>
                                            {'Product ID #' +
                                              item?.product_code}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                    {!item?.in_cart ? (
                                      <TouchableOpacity
                                        // ADD TO CART UI
                                        style={{
                                          borderWidth: 1,
                                          borderColor: Color?.primary,
                                          margin: 5,
                                          padding: 5,
                                          borderRadius: 20,
                                        }}
                                        onPress={() => AddToCart(item)}>
                                        <View
                                          style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}>
                                          <Text
                                            style={{
                                              color: Color?.primary,
                                              fontSize: 15,
                                              fontFamily: Manrope.SemiBold,
                                            }}>
                                            + Add to cart
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                    ) : (
                                      <View
                                        // UPDATE CART UI
                                        style={{
                                          flexDirection: 'row',
                                          margin: 5,
                                          padding: 5,
                                          backgroundColor: Color?.primary,
                                          borderRadius: 20,
                                          justifyContent: 'space-between',
                                          paddingLeft: 20,
                                          paddingRight: 20,
                                        }}>
                                        <TouchableOpacity
                                          style={{
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                          }}
                                          onPress={() => {
                                            removeCart(item);
                                          }}>
                                          <Text
                                            style={{
                                              color: Color?.white,
                                              fontSize: 18,
                                              fontFamily: Manrope.SemiBold,
                                            }}>
                                            -
                                          </Text>
                                        </TouchableOpacity>
                                        <Text
                                          style={{
                                            color: Color?.white,
                                            fontSize: 15,
                                            fontFamily: Manrope.SemiBold,
                                          }}>
                                          {item?.in_cart?.quantity
                                            ? item?.in_cart?.quantity
                                            : 1}
                                        </Text>
                                        <TouchableOpacity
                                          style={{
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                          }}
                                          onPress={() => {
                                            AddToCartApi(item);
                                          }}>
                                          <Text
                                            style={{
                                              color: Color?.white,
                                              fontSize: 18,
                                              fontFamily: Manrope.SemiBold,
                                            }}>
                                            +
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    )}
                                  </TouchableOpacity>
                                );
                              }}
                              style={{margin: 5}}
                            />
                          )}
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
          </View>
        </View>
        {cart_Data?.count > 0 ? (
          <View
            style={{
              backgroundColor: Color?.white,
              padding: 17,
              width: scr_width,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Color?.primary,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 11,
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('MyCart')}>
              <View style={{gap: 5}}>
                <Text style={{fontSize: 16, color: Color?.white}}>
                  {cart_Data?.count == 1
                    ? `${cart_Data?.count} item added`
                    : `${cart_Data?.count} items added `}
                </Text>
                {cart_Data?.weight !== null ? (
                  <Text style={{fontSize: 12, color: Color?.white}}>
                    {cart_Data?.weight} g
                  </Text>
                ) : null}
              </View>
              <View>
                <Iconviewcomponent
                  Icontag={'FontAwesome5'}
                  iconname={'arrow-circle-right'}
                  icon_size={35}
                  icon_color={Color.white}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
});
