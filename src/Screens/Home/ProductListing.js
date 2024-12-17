import React, {useState, useEffect, useRef} from 'react';
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
  BackHandler,
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
import Filtermodal from '../../Components/Filter/Filtermodal';
import RBSheet from 'react-native-raw-bottom-sheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
const ProductListing = ({route, navigation}) => {
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
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
  const [filterPurity, setFilterPurity] = useState('');
  const [sliderValue, setSliderValue] = useState([1, 100]);
  const [filterdata, setFilterdata] = useState([
    {
      id: '0',
      name: 'gender',
      Data: [
        {
          id: '0',
          name: 'men',
        },
        {
          id: '1',
          name: 'women',
        },
        {
          id: '2',
          name: 'couples',
        },
        {
          id: '3',
          name: 'kids',
        },
      ],
    },
    {
      id: '1',
      name: 'Weight',
    },
    {
      id: '2',
      name: 'Purity',
      Data: [
        {
          id: '0',
          name: '18 KT',
        },
        {
          id: '1',
          name: '22 KT',
        },
      ],
    },
  ]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPurity, setSelectedPurity] = useState('');
  const CategoryData = route.params;

  console.log('000000', CategoryData, '+++++++++++++');

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
  const [Filter, setFilter] = useState([
    {
      id: '0',
      name: 'Filter',
    },
    {
      id: '1',
      name: 'Gender',
    },
    {
      id: '2',
      name: 'Weight',
    },
    {
      id: '3',
      name: 'Purity',
    },
  ]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [shopSection] = useState([
    {id: 2, title: 'Category', data: ['Category']},
  ]);
  const [categoryData, setCategoryData] = useState([]);
  // GET PRODUCT LIST FUNCTION
  const GetProductList = async id => {
    try {
      const Product_Details = await fetchData?.Product_List(id);
      if (Product_Details?.success == true) {
        setCategoryData(Product_Details?.data);
        console.log('=======>>>>>>.value', Product_Details?.data);
        get_Cart_Count();
      } else {
        setCategoryData([]);
        console.log('Failed To Get Product List', Product_Details);
      }
    } catch (error) {
      console.log('catch in GetProductList : ', error);
    }
  };
  const GetProductListkeywords = async id => {
    try {
      const Product_Details = await fetchData?.Product_Listkeywords(id);
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
      if (CategoryData?.keywords === false) {
        // console.log('vvvvvvvvvvvvvvvvvvv', CategoryData?.sub_category?._id);

        GetProductList(CategoryData?.sub_category?._id);
        setSelectItem('0');
      } else {
        GetProductListkeywords(CategoryData?.keywordsData?.name);
      }
      Notification();
      return () => {};
    }, []),
  );
  // SELECT THE CATEGORY (WOMEN, MEN, KIDS)
  const selectedItem = item => {
    try {
      setSelectItem(item.id);
      if (CategoryData?.keywords === false) {
        GetProductList(CategoryData?.CategoryList?._id, item?.id);
      } else {
        GetProductListkeywords(CategoryData?.keywordsData?.name);
        console.log('cvcvcvc');
      }
    } catch (error) {
      console.log('catch in selected_Item : ', error);
    }
  };
  const Getfilterproducts = async (id, purity, gender, weight) => {
    try {
      const Product_Details = await fetchData?.Filter_Product_List(
        gender,
        weight == '1,100' ? null : weight,
        purity,
        id,
      );
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
  // ADD TO CART FUNCTION
  const AddToCart = async item => {
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
      const CART_FUNCTION = await fetchData?.New_Add_To_Cart(data);
      if (CART_FUNCTION?.success == true) {
        if (CategoryData?.keywords === false) {
          if (selectedPurity) {
            Getfilterproducts(
              CategoryData?.sub_category?._id,
              selectedPurity?.name,
              null,
              null,
            );
          } else {
            if (selectedGender) {
              Getfilterproducts(
                CategoryData?.sub_category?._id,
                null,
                selectedGender?.name,
                null,
              );
            } else {
              let Weigthvalue = sliderValue.join(',');
              if (Weigthvalue != '1,100') {
                Getfilterproducts(
                  CategoryData?.sub_category?._id,
                  null,
                  null,
                  Weigthvalue,
                );
              } else {
                GetProductList(CategoryData?.sub_category?._id);
              }
            }
          }
          // GetProductList(CategoryData?.sub_category?._id);
        } else {
          GetProductListkeywords(CategoryData?.keywordsData?.name);
        }

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
        if (CategoryData?.keywords === false) {
          if (selectedPurity) {
            Getfilterproducts(
              CategoryData?.sub_category?._id,
              selectedPurity?.name,
              null,
              null,
            );
          } else {
            if (selectedGender) {
              Getfilterproducts(
                CategoryData?.sub_category?._id,
                null,
                selectedGender?.name,
                null,
              );
            } else {
              let Weigthvalue = sliderValue.join(',');
              if (Weigthvalue != '1,100') {
                Getfilterproducts(
                  CategoryData?.sub_category?._id,
                  null,
                  null,
                  Weigthvalue,
                );
              } else {
                GetProductList(CategoryData?.sub_category?._id);
              }
            }
          }
        } else {
          GetProductListkeywords(CategoryData?.keywordsData?.name);
        }
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
          if (CategoryData?.keywords === false) {
            if (selectedPurity) {
              Getfilterproducts(
                CategoryData?.sub_category?._id,
                selectedPurity?.name,
                null,
                null,
              );
            } else {
              if (selectedGender) {
                Getfilterproducts(
                  CategoryData?.sub_category?._id,
                  null,
                  selectedGender?.name,
                  null,
                );
              } else {
                let Weigthvalue = sliderValue.join(',');
                if (Weigthvalue != '1,100') {
                  Getfilterproducts(
                    CategoryData?.sub_category?._id,
                    null,
                    null,
                    Weigthvalue,
                  );
                } else {
                  GetProductList(CategoryData?.sub_category?._id);
                }
              }
            }
          } else {
            GetProductListkeywords(CategoryData?.keywordsData?.name);
          }
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
      console.log('=========>>>>>count : ', item?.stock);
      const Quantity = item?.in_cart?.quantity + 1;
      const data = {
        quantity: Quantity,
      };
      if (Quantity <= item?.stock) {
        const Cart_item_Update = await fetchData?.Add_To_Cart(
          data,
          item?.in_cart?.id,
        );
        if (Cart_item_Update?.success == true) {
          if (CategoryData?.keywords === false) {
            if (selectedPurity) {
              Getfilterproducts(
                CategoryData?.sub_category?._id,
                selectedPurity?.name,
                null,
                null,
              );
            } else {
              if (selectedGender) {
                Getfilterproducts(
                  CategoryData?.sub_category?._id,
                  null,
                  selectedGender?.name,
                  null,
                );
              } else {
                let Weigthvalue = sliderValue.join(',');
                if (Weigthvalue != '1,100') {
                  Getfilterproducts(
                    CategoryData?.sub_category?._id,
                    null,
                    null,
                    Weigthvalue,
                  );
                } else {
                  GetProductList(CategoryData?.sub_category?._id);
                }
              }
            }
          } else {
            GetProductListkeywords(CategoryData?.keywordsData?.name);
          }
        } else {
          console.log('Failed To Add To Cart');
        }
      } else {
        ToastAndroid.show(
          `Maximum Quantity is ${item?.stock}`,
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('catch in AddToCart : ', error);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (CategoryData?.keywords === false) {
      GetProductList(CategoryData?.sub_category?._id, selectItem);
    } else {
      GetProductListkeywords(CategoryData?.keywordsData?.name);
    }
    Notification();
    setSelectItem('0');
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  // Filter in Product List Purity :
  const Get_ProductList_purity = async purity => {
    try {
      console.log('purity', purity?.name);
      const Filterproduct = await fetchData?.Filter_Product_List(
        null,
        null,
        purity?.name,
        CategoryData?.sub_category?._id,
      );
      console.log('APPPPPPPPPPPPPPPPPPPP', Filterproduct);

      if (Filterproduct?.success == true) {
        setCategoryData(Filterproduct?.data);
        // setSelectedPurity('');
        setSliderValue([1, 100]);
        setSelectedGender('');
      } else {
        setCategoryData([]);
      }
    } catch (error) {
      console.log('catch in Get_ProductList : ', error);
    }
  };
  // Filter in Product List Weight :
  const Get_ProductList_Weight = async Weight => {
    try {
      function formatRange(range) {
        return range.join(',');
      }
      formatRange(Weight);
      const Filterproduct = await fetchData?.Filter_Product_List(
        null,
        formatRange(Weight),
        null,
        CategoryData?.sub_category?._id,
      );
      console.log('APPPPPPPPPPPPPPPPPPPP', Filterproduct);

      if (Filterproduct?.success == true) {
        setCategoryData(Filterproduct?.data);
        setSelectedPurity('');
        setSelectedGender('');
      } else {
        setCategoryData([]);
      }
    } catch (error) {
      console.log('catch in Get_ProductList : ', error);
    }
  };
  // Filter in Product List Gender :
  const Get_ProductList_Gender = async Gender => {
    try {
      console.log('data', CategoryData?.CategoryList?._id);
      console.log('Gender?.name', Gender?.name);

      const Filterproduct = await fetchData?.Filter_Product_List(
        Gender?.name,
        null,
        null,
        CategoryData?.sub_category?._id,
      );
      console.log('APPPPPPPPPPPPPPPPPPPP', Filterproduct);

      if (Filterproduct?.success == true) {
        setCategoryData(Filterproduct?.data);
        setSliderValue([1, 100]);
        setSelectedPurity('');
        // setSelectedGender('');
      } else {
        setCategoryData([]);
      }
    } catch (error) {
      console.log('catch in Get_ProductList : ', error);
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
                  iconname={'left'}
                  icon_size={24}
                  icon_color={Color.black}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: Color.black,
                  fontFamily: Manrope.Medium,
                }}>
                {CategoryData?.keywords === false
                  ? CategoryData?.CategoryList?.name
                  : CategoryData?.keywordsData?.name}
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
          {/* {CategoryData?.keywords === false ? (
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
          ) : null} */}
          <View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width: scr_width}}>
              <FlatList
                data={Filter}
                keyExtractor={(item, index) => item + index}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (index == 0) {
                          setFilterVisible(true);
                        } else {
                          if (index == 1) {
                            refRBSheet1.current.open();
                          } else {
                            if (index == 2) {
                              refRBSheet2.current.open();
                            } else {
                              if (index == 3) {
                                refRBSheet3.current.open();
                              }
                            }
                          }
                        }
                      }}
                      style={{
                        margin: 5,
                        justifyContent: 'center',
                        paddingHorizontal: 25,
                        padding: 5,
                        borderRadius: 30,
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor:
                          index == 0 ? Color?.black : Color?.white,
                        // borderColor: Color.primary,
                        borderWidth: 1,
                        gap: 10,
                      }}>
                      {index == 0 ? (
                        <Image
                          source={require('../../assets/Images/filtericon.png')}
                          style={{width: 13, height: 13}}
                        />
                      ) : null}
                      <Text
                        style={{
                          fontSize: 12,
                          color: index == 0 ? Color?.white : Color?.black,
                          font: Manrope.Bold,
                          paddingVertical: 5,
                        }}>
                        {item?.name}
                      </Text>
                      {index == 0 ? null : (
                        <Iconviewcomponent
                          Icontag={'AntDesign'}
                          iconname={'caretdown'}
                          icon_size={15}
                          icon_color={Color.black}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
                style={{margin: 5}}
              />
            </ScrollView>
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
                                console.log('======>item', item);
                                const data = item?.stock;
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
                                          resizeMode: 'cover',
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
                                              font: Manrope.Medium,
                                              fontWeight: '500',
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
                                              fontWeight: '400',
                                              font: Manrope.Regular,
                                            }}>
                                            {'Product ID #' +
                                              (item?.product_code.length > 10
                                                ? item?.product_code.substring(
                                                    0,
                                                    10,
                                                  ) + '...'
                                                : item?.product_code)}
                                          </Text>
                                          {item?.size_variants?.length > 0 && (
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: '#999999',
                                                font: Manrope.Regular,
                                                fontWeight: '400',
                                                textTransform: 'capitalize',
                                              }}>
                                              {'size - ' +
                                                item?.size_variants[0]}
                                            </Text>
                                          )}
                                          {item?.weight_variants?.length >
                                            0 && (
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: '#999999',
                                                font: Manrope.Regular,
                                                fontWeight: '400',
                                                textTransform: 'capitalize',
                                              }}>
                                              {'weight - ' +
                                                item?.weight_variants[0]}
                                            </Text>
                                          )}
                                          {item?.purity_variants?.length >
                                            0 && (
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: '#999999',
                                                font: Manrope.Regular,
                                                fontWeight: '400',
                                                textTransform: 'capitalize',
                                              }}>
                                              {'purity - ' +
                                                item?.purity_variants[0]}
                                            </Text>
                                          )}
                                        </View>
                                      </View>
                                    </View>
                                    {data <= 0 ? (
                                      <View
                                        // ADD TO CART UI
                                        style={{
                                          borderWidth: 1,
                                          borderColor: Color?.red,
                                          margin: 5,
                                          padding: 5,
                                          borderRadius: 20,
                                        }}>
                                        <View
                                          style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}>
                                          <Text
                                            style={{
                                              color: Color?.red,
                                              fontSize: 15,
                                              fontFamily: Manrope.SemiBold,
                                            }}>
                                            out of stock
                                          </Text>
                                        </View>
                                      </View>
                                    ) : !item?.in_cart ? (
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
      {/* <----------------- GENDER ---------------------> */}
      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={280}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000088',
          },
          container: {
            backgroundColor: 'white',
          },
        }}>
        <View style={{padding: 10, flex: 1}}>
          <View style={{padding: 10, flex: 1}}>
            <Text
              style={{
                color: Color?.primary,
                fontSize: 18,
                fontFamily: Manrope.SemiBold,
              }}>
              Select Gender
            </Text>
            <FlatList
              data={filterdata[0]?.Data}
              keyExtractor={(item, index) => item + index}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                const selected = selectedGender?.name === item.name;
                return (
                  <View
                    style={{
                      backgroundColor: Color?.white,
                      margin: 5,
                      padding: 5,
                      borderRadius: 20,
                      justifyContent: 'space-between',
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}>
                    <TouchableOpacity
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        // justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}
                      onPress={() => {
                        setSelectedGender(item);
                        // setGender(item);
                        // refRBSheet1.current.close();
                      }}>
                      <Iconviewcomponent
                        Icontag={'Fontisto'}
                        iconname={
                          selected ? 'radio-btn-active' : 'radio-btn-passive'
                        }
                        icon_size={16}
                        icon_color={Color.primary}
                      />
                      <Text
                        style={{
                          color: selected ? Color?.primary : Color?.black,
                          fontSize: 16,
                          fontFamily: Manrope.Regular,
                        }}>
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Color?.primary,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              Get_ProductList_Gender(selectedGender);
              refRBSheet1.current.close();
            }}>
            <Text style={{color: Color?.white, fontSize: 16}}>Apply</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      {/* <----------------- WEIGHT ---------------------> */}
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={180}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000088',
          },
          container: {
            backgroundColor: 'white',
          },
        }}>
        <View style={{padding: 10, flex: 1}}>
          <View style={{padding: 10, flex: 1}}>
            <Text
              style={{
                color: Color?.primary,
                fontSize: 18,
                fontFamily: Manrope.SemiBold,
              }}>
              Select Weight (Grams)
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MultiSlider
                values={sliderValue}
                onValuesChange={e => setSliderValue(e)}
                // containerStyle={{
                //   paddingHorizontal: widthPercentageToDP("3%"),
                //   paddingVertical: widthPercentageToDP("2%"),
                // }}
                min={1}
                max={99}
                step={1}
                // selectedStyle={styles.mintrackStyle}
                // unselectedStyle={styles.maxtrackStyle}
                isMarkersSeparated
                customMarkerLeft={e => {
                  return (
                    <View style={{alignItems: 'center', marginLeft: 5}}>
                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: 50,
                          height: 24,
                          width: 24,
                          marginTop: '30%',
                          borderWidth: 1,
                          borderColor: '#0E1827',
                        }}></View>
                      <Text
                        numberOfLines={1}
                        variant={'price_text'}
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color: Color?.primary,
                        }}>
                        {e.currentValue} g
                      </Text>
                    </View>
                  );
                }}
                customMarkerRight={e => {
                  return (
                    <View style={{alignItems: 'center'}}>
                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: 50,
                          height: 24,
                          width: 24,
                          marginTop: '30%',
                          borderWidth: 1,
                          borderColor: '#0E1827',
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        variant={'price_text'}
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          marginLeft: 5,
                          color: Color?.primary,
                        }}>
                        {e.currentValue} g
                      </Text>
                    </View>
                  );
                }}
                // markerStyle={styles.thumb}
                touchDimensions={{height: 24, width: 24, borderRadius: 20}}
                sliderLength={width / 1.3}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Color?.primary,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              Get_ProductList_Weight(sliderValue), refRBSheet2.current.close();
              // setSliderValue([1, 100]);
            }}>
            <Text style={{color: Color?.white, fontSize: 16}}>Apply</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      {/* <--------------------- PURITY ------------------> */}
      <RBSheet
        ref={refRBSheet3}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000088',
          },
          container: {
            backgroundColor: 'white',
          },
        }}>
        <View style={{padding: 10, flex: 1}}>
          <View style={{padding: 10, flex: 1}}>
            <Text
              style={{
                color: Color?.primary,
                fontSize: 18,
                fontFamily: Manrope.SemiBold,
              }}>
              Select Purity
            </Text>
            <FlatList
              data={filterdata[2]?.Data}
              keyExtractor={(item, index) => item + index}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                const selected = selectedPurity?.name === item.name;
                return (
                  <View
                    style={{
                      backgroundColor: Color?.white,
                      margin: 5,
                      padding: 5,
                      borderRadius: 20,
                      justifyContent: 'space-between',
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}>
                    <TouchableOpacity
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        // justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}
                      onPress={() => {
                        setSelectedPurity(item);
                        // setGender(item);
                        // refRBSheet1.current.close();
                      }}>
                      <Iconviewcomponent
                        Icontag={'Fontisto'}
                        iconname={
                          selected ? 'radio-btn-active' : 'radio-btn-passive'
                        }
                        icon_size={16}
                        icon_color={Color.primary}
                      />
                      <Text
                        style={{
                          color: selected ? Color?.primary : Color?.black,
                          fontSize: 16,
                          fontFamily: Manrope.Regular,
                        }}>
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Color?.primary,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              Get_ProductList_purity(selectedPurity);
              refRBSheet3.current.close();
            }}>
            <Text style={{color: Color?.white, fontSize: 16}}>Apply</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      {filterVisible && (
        <Filtermodal
          id={CategoryData?.sub_category?._id}
          filterVisible={filterVisible}
          setFilterVisible={setFilterVisible}
          navigation={navigation}
          setCategoryData={setCategoryData}
        />
      )}
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
