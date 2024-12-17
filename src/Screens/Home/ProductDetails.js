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
  ToastAndroid,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Color from '../../Global/Color';
import {useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Manrope} from '../../Global/FontFamily';
import {Badge} from 'react-native-paper';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import SwiperFlatList from 'react-native-swiper-flatlist';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
// import ImageViewer from 'react-native-image-zoom-viewer';
const {width} = Dimensions.get('window');
// create a component
const ProductDetails = ({navigation, route}) => {
  const Routedata = route.params;
  console.log('Routedata', Routedata, 'Routedata');

  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);
  const [selectItem, setSelectItem] = useState(null);
  const [selectWeightItem, setSelectWeightItem] = useState(null);
  const [selectpurityItem, setSelectpurityItem] = useState(null);
  const [productdetails, setproductdetails] = useState({});
  const [selectqualityItem, setSelectqualityItem] = useState(1);
  const [notificationcount, setNotificationcount] = useState(0);
  const [selectedimage, setSelectedimage] = useState('');
  const cart_count = useSelector(state => state.UserReducer.Cart_Count);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [shopSection] = useState([
    {id: 1, title: 'banners', data: ['banners']},
    {id: 2, title: 'Category', data: ['Category']},
    {id: 3, title: 'Sizes', data: ['Sizes']},
    {id: 4, title: 'Quality', data: ['Quality']},
    {id: 4, title: 'Purity', data: ['Purity']},
    {id: 5, title: 'Product', data: ['Product']},
    {id: 6, title: 'Description', data: ['Description']},
    {id: 7, title: 'Similar', data: ['Similar']},
  ]);
  const images = [
    {
      // Simplest usage.
      url: 'https://mrbrother-images.s3.ap-south-1.amazonaws.com/products/1728366158635.webp',
      props: {
        // headers: ...
      },
    },
  ];

  const [similar, setsimilar] = useState([]);

  // SELECTED ITEM
  const selectedItem = item => {
    try {
      setSelectItem(item);
    } catch (error) {
      console.log('catch in product_details selected_Item : ', error);
    }
  };

  // SELECTED WEIGHT ITEM
  const selectedWeightItem = item => {
    try {
      setSelectWeightItem(item);
    } catch (error) {
      console.log('catch in product_details selected_Item : ', error);
    }
  };

  // SELECTED PRODUCT ITEM
  const getProductDetails = async id => {
    try {
      const productDetails = await fetchData?.Product_Details(id);
      if (productDetails?.success == true) {
        GetSimilarProduct(productDetails?.data?.category?._id);
        setproductdetails(productDetails?.data);
        console.log(
          '====================>dddddddddddddd',
          productDetails?.data,
        );
        if (productDetails?.data?.size_variants?.length > 0) {
          setSelectItem(productDetails?.data?.size_variants[0]);
        }
        if (productDetails?.data?.weight_variants?.length > 0) {
          setSelectWeightItem(productDetails?.data?.weight_variants[0]);
        }
        if (productDetails?.data?.purity_variants?.length > 0) {
          setSelectpurityItem(productDetails?.data?.purity_variants[0]);
        }
      }
    } catch (error) {
      console.log('catch in get_product_details : ', error);
    }
  };

  // GET SIMILAR PRODUCT
  const GetSimilarProduct = async id => {
    try {
      const Product_Details = await fetchData?.GetAllProductlist(id);
      if (Product_Details?.success == true) {
        console.log('@@@@@@@@@@@@@@@', Product_Details?.data);

        setsimilar(Product_Details?.data);
      } else {
        setsimilar([]);
        console.log('Failed To Get Product List', Product_Details);
      }
    } catch (error) {
      console.log('catch in GetProductList : ', error);
    }
  };
  const Feature_data = [
    {
      key: 'Name',
      value: 'Value',
    },
    {
      key: 'kcnkdcvn',
      value: 'ovnfkjvn',
    },
  ];
  // ADD TO CART
  const AddtoCart = async () => {
    try {
      if (selectItem == null && productdetails?.size_variants?.length > 0) {
        ToastAndroid.show('Please Select Size', ToastAndroid.SHORT);
      } else {
        if (
          selectpurityItem == null &&
          productdetails?.purity_variants?.length > 0
        ) {
          ToastAndroid.show('Please Select Purity', ToastAndroid.SHORT);
        } else {
          if (
            selectWeightItem == null &&
            productdetails?.weight_variants?.length > 0
          ) {
            ToastAndroid.show('Please Select Weight', ToastAndroid.SHORT);
          } else {
            const data = {
              product_id: productdetails?._id,
              quantity: selectqualityItem,
              weight_variant: selectWeightItem,
              size_variant: selectItem,
              purity_variant: selectpurityItem,
            };
            const CART_FUNCTION = await fetchData?.New_Add_To_Cart(data);
            if (CART_FUNCTION?.success == true) {
              navigation.navigate('MyCart');
            } else {
              if (CART_FUNCTION?.success == false) {
                if (CART_FUNCTION?.message == 'Cart already exist') {
                  ToastAndroid.show(CART_FUNCTION?.message, ToastAndroid.SHORT);
                } else {
                  ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log('catch in AddtoCart : ', error);
    }
  };
  // GET NOTIFICATION COUNT API FUNCTION :
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

  // USE USEFOCUSEFFECT FUNCTION
  useFocusEffect(
    React.useCallback(() => {
      if (Routedata?.Productdata) {
        getProductDetails(Routedata?.Productdata);
        Notification();
      }
      return () => {};
    }, []),
  );

  // useEffect(() => {
  //   if (Routedata?.Productdata) {
  //     getProductDetails(Routedata?.Productdata);
  //     Notification();
  //     // GetSimilarProduct(Routedata?.Productdata)
  //   }
  // }, []);

  // OrderFunction
  const OrderFunction = async () => {
    try {
      setLoader(true);
      if (selectItem == null && productdetails?.size_variants?.length > 0) {
        ToastAndroid.show('Please Select Size', ToastAndroid.SHORT);
      } else {
        if (
          selectWeightItem == null &&
          productdetails?.weight_variants?.length > 0
        ) {
          ToastAndroid.show('Please Select Weight', ToastAndroid.SHORT);
        } else {
          if (
            selectpurityItem == null &&
            productdetails?.purity_variants?.length > 0
          ) {
            ToastAndroid.show('Please Select Purity', ToastAndroid.SHORT);
          } else {
            const value = [];
            let obj = {
              product_id: productdetails?._id,
              quantity: selectqualityItem,
              size_variant: selectItem,
              weight_variant: selectWeightItem,
              purity_variant: productdetails?.purity_variants[0],
            };
            value.push(obj);
            const Ordervalue = {
              is_cart: 0,
              products: value,
            };
            const order = await fetchData?.Post_Order(Ordervalue);
            if (order?.success == true) {
              console.log('ddddddddddddddd', 'go to order');
              setLoader(false);
              navigation.navigate('OrderSuccess');
            } else {
              setLoader(false);
              ToastAndroid.show(order?.message, ToastAndroid.SHORT);
              console.log('Failed To Add To Cart', order);
            }
          }
        }
      }
    } catch (error) {
      setLoader(false);
      console.log('Catch in OrderFunction : ', error);
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
                iconname={'left'}
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
              {productdetails?.name ? productdetails?.name : 'Product Details'}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              backgroundColor: Color.white,
              // padding: 10,
            }}>
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
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: width,
                            alignItems: 'center',
                          }}>
                          <SwiperFlatList
                            autoplay
                            autoplayDelay={5}
                            autoplayLoop
                            index={activeIndex}
                            showPagination={productdetails?.images?.length > 1}
                            data={productdetails?.images}
                            paginationActiveColor={Color.primary}
                            ListEmptyComponent={
                              <ActivityIndicator
                                color={Color?.primary}
                                size="large"
                              />
                            }
                            onTouchMove={() => {
                              console.log('onTouchMove');
                            }}
                            // onTouchStart={() => {
                            //   setModalVisible(true);
                            // }}
                            paginationStyleItem={{
                              width: 8,
                              height: 8,
                              marginTop: 0,
                              marginHorizontal: 2,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            renderItem={({item}) => (
                              <TouchableOpacity
                                // style={{backgroundColor: 'red'}}
                                onPress={() => {
                                  setSelectedimage(item);
                                  setModalVisible(true);
                                }}>
                                <Image
                                  source={{uri: item}}
                                  style={{
                                    width: width,
                                    height: 240,
                                    // borderRadius: 5,
                                    resizeMode: 'cover',
                                    // marginHorizontal: 5,
                                  }}
                                />
                              </TouchableOpacity>
                            )}
                            onChangeIndex={({index}) => {
                              setActiveIndex(index); // Update the activeIndex state when slide changes
                            }}
                          />
                        </View>
                        <View style={{width: '95%', marginVertical: 10}}>
                          <FlatList
                            data={productdetails?.images}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item, index}) => {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    margin: 10,
                                    borderWidth: index === activeIndex ? 1 : 0, // Highlight selected item
                                    borderColor:
                                      index === activeIndex
                                        ? Color.primary
                                        : 'white',
                                  }}
                                  onPress={() => {
                                    setModalVisible(true);
                                    setSelectedimage(item);
                                  }}>
                                  <Image
                                    source={{uri: item}}
                                    style={{
                                      width: 70,
                                      height: 70,
                                      borderRadius: 2,
                                      resizeMode: 'cover',
                                    }}
                                  />
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>
                      </View>
                    );
                  case 'Category':
                    return (
                      <View
                        style={{
                          width: scr_width,
                          marginHorizontal: 17,
                          alignItems: 'center',
                          gap: 12,
                        }}>
                        {productdetails?.purity_variants?.length > 0 ? (
                          <View
                            style={{
                              width: scr_width,
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                            }}>
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: '#F2D292',
                                borderRadius: 30,
                              }}></View>

                            <Text
                              style={{
                                fontSize: 10,
                                color: Color.black,
                                fontFamily: Manrope.Medium,
                                letterSpacing: 0.5,
                                fontWeight: '500',
                              }}>
                              {productdetails?.purity_variants[0]}
                            </Text>
                          </View>
                        ) : null}

                        <View style={{gap: 5}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: Color.black,
                                  textAlign: 'justify',
                                  fontFamily: Manrope.Medium,
                                  letterSpacing: 0.5,
                                  fontWeight: '500',
                                }}
                                numberOfLines={2}>
                                {productdetails?.name}{' '}
                              </Text>
                            </View>
                          </View>
                          <View style={{width: scr_width}}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Medium,
                                letterSpacing: 0.5,
                              }}
                              numberOfLines={1}>
                              Product ID{' '}
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Color.cloudyGrey,
                                  fontFamily: Manrope.Medium,
                                  letterSpacing: 0.5,
                                }}>
                                #{productdetails?.product_code}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  case 'Sizes':
                    return (
                      <View style={{width: '95%', alignItems: 'center'}}>
                        {productdetails?.size_variants?.length > 0 ? (
                          <View style={{width: '95%', marginTop: 29}}>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: '#333333',
                                  paddingHorizontal: 10,
                                  textAlign: 'justify',
                                  fontFamily: Manrope.Bold,
                                  letterSpacing: 0.5,
                                }}
                                numberOfLines={1}>
                                Select Size{' '}
                                {productdetails?.size_type
                                  ? productdetails?.size_type == 'size'
                                    ? ' '
                                    : `(${productdetails?.size_type})`
                                  : ''}
                              </Text>
                              {/* <Text
                              style={{
                                fontSize: 14,
                                color: Color.red,
                                textDecorationLine: 'underline',
                                textAlign: 'justify',
                                fontFamily: Manrope.SemiBold,
                                letterSpacing: 0.5,
                              }}
                              numberOfLines={1}>
                              Ring Size Guide
                            </Text> */}
                            </View>
                            <View
                              style={{
                                width: '100%',
                                marginTop: 15,
                                marginBottom: '30',
                              }}>
                              <FlatList
                                data={productdetails?.size_variants}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item, index}) => {
                                  const value = item;
                                  var selectItemBg =
                                    selectItem === value
                                      ? Color.gold
                                      : Color.white;
                                  return (
                                    <TouchableOpacity
                                      onPress={() => {
                                        selectedItem(value);
                                      }}
                                      key={index}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        margin: 5,
                                        backgroundColor: selectItemBg,
                                        padding: 10,
                                        paddingHorizontal: 20,
                                        borderWidth: 1,
                                        borderColor:
                                          selectItem === value
                                            ? Color.gold
                                            : '#999999',
                                        borderRadius: 30,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color:
                                            selectItem === value
                                              ? Color.white
                                              : '#999999',
                                          fontFamily: Manrope.SemiBold,
                                        }}>
                                        {value}
                                      </Text>
                                    </TouchableOpacity>
                                  );
                                }}
                              />
                            </View>
                          </View>
                        ) : null}

                        {productdetails?.purity_variants?.length > 0 ? (
                          <View style={{width: '95%'}}>
                            <View
                              style={{
                                width: '95%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: '#333333',
                                  paddingHorizontal: 10,
                                  textAlign: 'justify',
                                  fontFamily: Manrope.Bold,
                                  letterSpacing: 0.5,
                                }}
                                numberOfLines={1}>
                                Purity (in KT)
                              </Text>
                            </View>
                            <View style={{width: '95%', marginVertical: 10}}>
                              <FlatList
                                data={productdetails?.purity_variants}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item, index}) => {
                                  const purity = item;
                                  var selectItemBg =
                                    selectpurityItem === purity
                                      ? Color.gold
                                      : Color.white;
                                  return (
                                    <TouchableOpacity
                                      onPress={() => {
                                        setSelectpurityItem(purity);
                                      }}
                                      key={index}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        margin: 5,
                                        backgroundColor: selectItemBg,
                                        padding: 10,
                                        paddingHorizontal: 20,
                                        borderWidth: 1,
                                        borderColor:
                                          selectpurityItem === purity
                                            ? Color.gold
                                            : '#999999',
                                        borderRadius: 30,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color:
                                            selectpurityItem === purity
                                              ? Color.white
                                              : '#999999',
                                          fontFamily: Manrope.SemiBold,
                                        }}>
                                        {purity}
                                      </Text>
                                    </TouchableOpacity>
                                  );
                                }}
                              />
                            </View>
                          </View>
                        ) : null}

                        {productdetails?.weight_variants?.length > 0 ? (
                          <View style={{width: '95%'}}>
                            <View
                              style={{
                                width: '95%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: '#333333',
                                  paddingHorizontal: 10,
                                  textAlign: 'justify',
                                  fontFamily: Manrope.Bold,
                                  letterSpacing: 0.5,
                                }}
                                numberOfLines={1}>
                                Weight{' '}
                                {productdetails?.weight_type
                                  ? `(${productdetails?.weight_type})`
                                  : ''}
                              </Text>
                            </View>
                            <View style={{width: '95%', marginVertical: 10}}>
                              <FlatList
                                data={productdetails?.weight_variants}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item, index}) => {
                                  const weight = item;
                                  var selectItemBg =
                                    selectWeightItem === weight
                                      ? Color.gold
                                      : Color.white;
                                  return (
                                    <TouchableOpacity
                                      onPress={() => {
                                        // console.log(
                                        //   '===========>>>....?',
                                        //   weight,
                                        // );

                                        selectedWeightItem(weight);
                                      }}
                                      key={index}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        margin: 5,
                                        backgroundColor: selectItemBg,
                                        padding: 10,
                                        paddingHorizontal: 20,
                                        borderWidth: 1,
                                        borderColor:
                                          selectWeightItem === weight
                                            ? Color.gold
                                            : '#999999',
                                        borderRadius: 30,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color:
                                            selectWeightItem === weight
                                              ? Color.white
                                              : '#999999',
                                          fontFamily: Manrope.SemiBold,
                                        }}>
                                        {weight}
                                      </Text>
                                    </TouchableOpacity>
                                  );
                                }}
                              />
                            </View>
                          </View>
                        ) : null}
                      </View>
                    );
                  case 'Quality':
                    return (
                      <View
                        style={{
                          width: '100%',
                          height: height,
                          marginVertical: 15,
                        }}>
                        <View
                          style={{
                            width: '95%',
                            height: height,
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View>
                            <Text
                              style={{
                                paddingHorizontal: 20,
                                fontSize: 16,
                                color: Color.black,
                                textAlign: 'justify',
                                fontFamily: Manrope.Bold,
                                letterSpacing: 0.5,
                              }}>
                              Quantity
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                              style={{
                                padding: 10,
                                paddingHorizontal: 10,
                                backgroundColor: Color.transparantBlack,
                                borderRadius: 5,
                              }}
                              onPress={() => {
                                if (selectqualityItem > 1) {
                                  const value = selectqualityItem - 1;
                                  setSelectqualityItem(value);
                                } else {
                                  ToastAndroid.show(
                                    'Minimum Quantity is 1',
                                    ToastAndroid.SHORT,
                                  );
                                }
                              }}>
                              <Iconviewcomponent
                                Icontag={'Entypo'}
                                iconname={'minus'}
                                icon_size={24}
                                icon_color={Color.black}
                              />
                            </TouchableOpacity>
                            <View style={{padding: 10, paddingHorizontal: 10}}>
                              <Text
                                style={{
                                  paddingHorizontal: 5,
                                  fontSize: 16,
                                  color: Color.black,
                                  textAlign: 'justify',
                                  fontFamily: Manrope.Bold,
                                  letterSpacing: 0.5,
                                }}>
                                {selectqualityItem}
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={{
                                padding: 10,
                                paddingHorizontal: 10,
                                backgroundColor: '#171717',
                                borderRadius: 5,
                              }}
                              onPress={() => {
                                console.log(productdetails?.stock, 'stock');

                                if (selectqualityItem >= 1) {
                                  const value = selectqualityItem + 1;
                                  if (productdetails?.stock == 0) {
                                    ToastAndroid.show(
                                      'Product is out of stock',
                                      ToastAndroid.SHORT,
                                    );
                                  } else {
                                    productdetails?.stock >= value
                                      ? setSelectqualityItem(value)
                                      : ToastAndroid.show(
                                          `Maximum Quantity is ${productdetails?.stock}`,
                                          ToastAndroid.SHORT,
                                        );
                                  }
                                } else {
                                  ToastAndroid.show(
                                    'Minimum Quantity is 1',
                                    ToastAndroid.SHORT,
                                  );
                                }
                              }}>
                              <Iconviewcomponent
                                Icontag={'Entypo'}
                                iconname={'plus'}
                                icon_size={24}
                                icon_color={Color.white}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  case 'Product':
                    return (
                      <View
                        style={{
                          width: '95%',
                          height: height,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: '100%',
                            height: 1,
                            marginVertical: 10,
                            paddingVertical: 5,
                            backgroundColor: '#F5F5F5',
                          }}></View>
                        <Text
                          style={{
                            width: '95%',
                            paddingHorizontal: 10,
                            paddingTop: 10,
                            fontSize: 16,
                            color: Color.black,
                            textAlign: 'justify',
                            fontFamily: Manrope.Bold,
                            letterSpacing: 0.5,
                          }}>
                          Product Description
                        </Text>
                        <View
                          style={{
                            width: '95%',
                            alignItems: 'center',
                            paddingVertical: 10,
                            // backgroundColor:'red',
                            paddingHorizontal: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.cloudyGrey,
                              textAlign: 'justify',
                              fontFamily: Manrope.Medium,
                              letterSpacing: 0.5,
                              lineHeight: 22,
                            }}>
                            {productdetails?.description}
                          </Text>
                        </View>
                      </View>
                    );
                  case 'Description':
                    return (
                      <View
                        style={{
                          width: '95%',
                          height: height,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: '100%',
                            height: 1,
                            marginVertical: 10,
                            paddingVertical: 5,
                            backgroundColor: '#F5F5F5',
                          }}></View>
                        <Text
                          style={{
                            width: '95%',
                            paddingHorizontal: 10,
                            paddingTop: 10,
                            fontSize: 16,
                            color: Color.black,
                            textAlign: 'justify',
                            fontFamily: Manrope.Bold,
                            letterSpacing: 0.5,
                          }}>
                          Product Details
                        </Text>
                        <View style={{width: '95%', marginTop: 10}}>
                          {productdetails?.brand ? (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                    letterSpacing: 0.5,
                                  }}>
                                  Brand
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  {productdetails?.brand}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                          {productdetails?.gender ? (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                    letterSpacing: 0.5,
                                  }}>
                                  Gender
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  {productdetails?.gender}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                          {productdetails?.metal ? (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  Metal
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  {productdetails?.metal}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                          {productdetails?.purity ? (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                    letterSpacing: 0.5,
                                  }}>
                                  Purity
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  {productdetails?.purity}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                          {productdetails?.metal_color ? (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                    letterSpacing: 0.5,
                                  }}>
                                  Metal Color
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  {productdetails?.metal_color}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                          {productdetails?.gross_weight ? (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                    letterSpacing: 0.5,
                                  }}>
                                  Gross Weight
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  {productdetails?.gross_weight}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                          {productdetails?.net_weight ? (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                    letterSpacing: 0.5,
                                  }}>
                                  Net Weight
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  {productdetails?.net_weight}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                          {productdetails?.certification ? (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                    letterSpacing: 0.5,
                                  }}>
                                  Certification
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  {productdetails?.certification}
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          {productdetails?.stone_weight ? (
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                    letterSpacing: 0.5,
                                  }}>
                                  Stone Weight
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.lightBlack,
                                    fontFamily: Manrope.SemiBold,
                                    letterSpacing: 0.5,
                                    textTransform: 'capitalize',
                                  }}>
                                  {productdetails?.stone_weight}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                          {productdetails?.features?.length > 0
                            ? productdetails?.features?.map((item, index) => {
                                return (
                                  <View
                                    style={{
                                      width: '100%',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      padding: 10,
                                    }}>
                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: Color.cloudyGrey,
                                          fontFamily: Manrope.Medium,
                                          letterSpacing: 0.5,
                                        }}>
                                        {item?.key}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: Color.lightBlack,
                                          fontFamily: Manrope.SemiBold,
                                          letterSpacing: 0.5,
                                          textTransform: 'capitalize',
                                        }}>
                                        {item?.value}
                                      </Text>
                                    </View>
                                  </View>
                                );
                              })
                            : null}
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 1,
                            marginVertical: 10,
                            paddingVertical: 5,
                            backgroundColor: '#F5F5F5',
                          }}></View>
                      </View>
                    );
                  case 'Similar':
                    return (
                      <View
                        style={{
                          width: '95%',
                          height: height,
                          alignItems: 'center',
                        }}>
                        {console.log(
                          'similar',
                          similar,
                          'eeeeeeeeeee',
                          Routedata?.Productdata,
                        )}
                        {similar?.length !== 0 ||
                        similar[0]?._id !== Routedata?.Productdata ? (
                          <Text
                            style={{
                              width: '95%',
                              paddingHorizontal: 10,
                              paddingTop: 10,
                              fontSize: 16,
                              color: '#111111',
                              fontWeight: '600',
                              textAlign: 'justify',
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                            }}>
                            Similar Products
                          </Text>
                        ) : null}

                        <View
                          style={{
                            width: scr_width * 0.9,
                            marginVertical: 10,
                            marginBottom: 30,
                          }}>
                          <FlatList
                            data={similar}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item, index}) => {
                              let product = item?._id;
                              console.log('DDDDDDDDDD', item?.stock);

                              if (product == Routedata?.Productdata) {
                                return null;
                              }
                              if (item?.stock <= 0) {
                                return null;
                              }
                              return (
                                <TouchableOpacity
                                  key={index}
                                  style={{
                                    // width: scr_width * 0.41,
                                    // height: scr_height * 0.245,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    margin: 5,
                                    // backgroundColor: Color.red,
                                    borderWidth: 1,
                                    borderColor: Color.Venus,
                                    borderRadius: 5,
                                    padding: 5,
                                    // backgroundColor:'green'
                                  }}
                                  onPress={() => {
                                    navigation.push('ProductDetails', {
                                      Productdata: item?._id,
                                    });
                                  }}>
                                  <View>
                                    <Image
                                      source={{uri: item?.images[0]}}
                                      style={{
                                        width: scr_width * 0.4045,
                                        height: scr_height * 0.191,
                                        // backgroundColor:Color?.grey,
                                        resizeMode: 'stretch',
                                        borderRadius: 5,
                                      }}
                                    />
                                  </View>
                                  <View
                                    style={{
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-start',
                                      width: scr_width * 0.41,
                                      // backgroundColor:'red'
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 13,
                                        color: Color.cloudyGrey,
                                        fontFamily: Manrope.Medium,
                                        letterSpacing: 0.5,
                                        textTransform: 'capitalize',
                                        // backgroundColor:'red'
                                      }}>
                                      {'Product ID #' +
                                        (item?.product_code.length > 6
                                          ? item?.product_code.substring(0, 6) +
                                            '...'
                                          : item?.product_code)}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 15,
                                        // textAlign: 'justify',
                                        color: Color.lightBlack,
                                        fontFamily: Manrope.SemiBold,
                                        letterSpacing: 0.5,
                                        textTransform: 'capitalize',
                                      }}
                                      numberOfLines={1}>
                                      {item.name}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>
                      </View>
                    );
                }
              }}
            />
          </View>
        </ScrollView>
        {productdetails?.stock > 0 ? (
          <View
            style={{
              width: '100%',
              paddingVertical: 15,
              flexDirection: 'row',
              backgroundColor: '#CCCCCC',
              justifyContent: 'space-between',
              alignItems: 'center',
              bottom: 0,
              elevation: 2,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                productdetails?.in_cart?.some(
                  item =>
                    selectWeightItem === item.weight_variant &&
                    selectItem === item.size_variant &&
                    selectpurityItem === item.purity_variant,
                )
                  ? navigation.navigate('MyCart')
                  : AddtoCart();
              }}>
              <Iconviewcomponent
                Icontag={'Feather'}
                iconname={'shopping-cart'}
                icon_size={22}
                icon_color={Color.black}
              />
              <Text
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}>
                {productdetails?.in_cart?.some(
                  item =>
                    selectWeightItem === item.weight_variant &&
                    selectItem === item.size_variant &&
                    selectpurityItem === item.purity_variant,
                )
                  ? 'Go to Cart'
                  : 'Add to cart'}
              </Text>
            </TouchableOpacity>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {loader ? (
                <TouchableOpacity
                  onPress={() => OrderFunction()}
                  style={{
                    width: scr_width * 0.41,
                    height: scr_height * 0.06,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Color.primary,
                    padding: 13,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                  }}>
                  <ActivityIndicator size="small" color={Color.white} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => OrderFunction()}
                  style={{
                    width: scr_width * 0.41,
                    height: scr_height * 0.06,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Color.primary,
                    padding: 13,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'bag-handle-outline'}
                    icon_size={22}
                    icon_color={Color.white}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      paddingHorizontal: 10,
                      color: Color.white,
                      fontFamily: Manrope.SemiBold,
                      letterSpacing: 0.5,
                    }}>
                    Buy Now
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : null}
      </View>
      {/* Product Photo Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1, backgroundColor: Color?.white, padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              paddingTop: 10,
              gap: 5,
            }}>
            <AntDesign
              name="left"
              size={25}
              color={Color?.black}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Text
              style={{
                fontSize: 20,
                color: Color?.black,
                textTransform: 'capitalize',
              }}>
              Product images
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: selectedimage,
              }}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          <View
            style={{
              flex: 0.16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={productdetails?.images}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                const Selected = selectedimage === item;
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      margin: 10,
                      borderWidth: Selected ? 1 : 0,
                      borderColor: Color.primary,
                    }}
                    onPress={() => {
                      setSelectedimage(item);
                    }}>
                    <Image
                      source={{uri: item}}
                      style={{
                        width: 70,
                        height: 70,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
});

//make this component available to the app
export default ProductDetails;
