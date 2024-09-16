import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import Color from '../../Global/Color';
import { useNavigation } from '@react-navigation/native';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Manrope } from '../../Global/FontFamily';
import { Badge } from 'react-native-paper';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../../Config/fetchData';

const ProductListing = ({ route, navigation }) => {
  const cart_count = useSelector(state => state.UserReducer.Cart_Count);
  const { width } = Dimensions.get('window');
  const [height, setHeight] = useState(undefined);
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectItem, setSelectItem] = useState('0');
  const CategoryData = route.params;
  console.log(CategoryData, 'CategoryDataCategoryData');

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
      filter_name: 'Kids',
    },
  ]);
  const [shopSection] = useState([
    { id: 2, title: 'Category', data: ['Category'] },
  ]);
  const [categoryData, setCategoryData] = useState([]);
  // GET PRODUCT LIST FUNCTION
  const GetProductList = async (id, category) => {
    let value = 'men';
    if (category == 1) {
      value = 'Women';
    } else if (category == 2) {
      value = 'kids';
    } else {
      value = 'men';
    }
    try {
      const Product_Details = await fetchData?.Product_List(id, value);
      if (Product_Details?.success == true) {
        setCategoryData(Product_Details?.data);
      } else {
        console.log('Failed To Get Product List', Product_Details);
      }
    } catch (error) {
      console.log('catch in GetProductList : ', error);
    }
  };
  // USE EFFECT IN GET PRODUCT LIST
  useEffect(() => {
    GetProductList(CategoryData?.CategoryList?._id, selectItem);
  }, []);
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
    console.log('AddToCart : ', item?._id);
    try {
      const data = {
        product_id: item?._id,
        quantity: 1,
      };
      const CART_FUNCTION = await fetchData?.New_Add_To_Cart(data);
      if (CART_FUNCTION?.success == true) {
        console.log('jbhjbh');
        GetProductList(CategoryData?.CategoryList?._id, selectItem);
        console.log('Successfully Added To Cart');
      }
      else {
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
  // UPDATE THE CART FUNCTION
  const updateCart = async item => {
    console.log('updateCart : ', item);
    try {
      console.log("SSSSSS");

    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      console.log('catch in updateCart : ', error);
    }
  }

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
          <Text style={{ color: 'white' }}>No Internet Connection</Text>
        </Animated.View>
      )}
      <View style={{ flex: 1 }}>
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
              style={{ paddingHorizontal: 10 }}>
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
              {CategoryData?.CategoryList?.cat_name}
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
              style={{ paddingHorizontal: 20 }}
              onPress={() => navigation.navigate('MyCart')}>
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
              <Iconviewcomponent
                Icontag={'Feather'}
                iconname={'shopping-cart'}
                icon_size={22}
                icon_color={Color.black}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => navigation.navigate('NotificationScreen')}>
              <Iconviewcomponent
                Icontag={'FontAwesome'}
                iconname={'bell-o'}
                icon_size={24}
                icon_color={Color.black}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: scr_width, marginVertical: 10 }}>
          <FlatList
            data={filterData}
            keyExtractor={(item, index) => item + index}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
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
                    backgroundColor: selectItemBg, borderColor: Color.primary, borderWidth: 1
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: selectItem === item.id ? Color.white : Color.black,
                      font: Manrope.Bold,
                      paddingVertical: 5,
                    }}>
                    {item?.filter_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            style={{ margin: 5 }}
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
            renderItem={({ item }) => {
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
                        <FlatList
                          data={categoryData}
                          keyExtractor={(item, index) => item + index}
                          numColumns={2}
                          columnWrapperStyle={styles.row}
                          ItemSeparatorComponent={() => (
                            <View style={{ padding: 5 }} />
                          )}
                          renderItem={({ item, index }) => {
                            console.log(item, '+++');

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
                                    source={{ uri: item?.images[0] }}
                                    style={{
                                      width: scr_width / 2.3,
                                      height: scr_height / 4.95,
                                      resizeMode: 'contain',
                                      borderRadius: 10,
                                    }}
                                  />
                                  <View style={{ gap: 10, padding: 5, flex: 1 }}>
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
                                            ? `${item?.name.slice(0, 19)}...`
                                            : item?.name
                                          : null}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: '#999999',
                                          font: Manrope.Regular,
                                        }}>
                                        {'Product ID #' + 'SampleID'}
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
                                      01
                                    </Text>
                                    <TouchableOpacity
                                      style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
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
                          style={{ margin: 5 }}
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
        </View>
      </View>
      <View
        style={{ backgroundColor: Color?.white, padding: 17, width: scr_width }}>
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
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 16, color: Color?.white }}>
              1 item added
            </Text>
            <Text style={{ fontSize: 12, color: Color?.white }}>5.244 g</Text>
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
