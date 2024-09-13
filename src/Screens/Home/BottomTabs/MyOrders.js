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

// create a component
const MyOrders = ({navigation}) => {
  const [height, setHeight] = useState(undefined);
  const [Myorder, setmyorder] = useState([]);
  const [shopSection] = useState([
    {id: 1, title: 'banners', data: ['banners']},
    {id: 2, title: 'Category', data: ['Category']},
  ]);

  const [filterData, setFilterData] = useState([
    {
      id: '0',
      filter_name: 'Placed',
    },
    {
      id: '1',
      filter_name: 'Processing',
    },
    {
      id: '2',
      filter_name: 'Delivered',
    },
    {
      id: '3',
      filter_name: 'Cancelled',
    },
  ]);

  const [orderData, setOrderData] = useState([
    {
      id: '0',
      order_name: 'Royal Gold Ring',
      order_product_Id: '#2222',
      order_status: 'In-Progressing',
      order_Id: '#0124',
      order_quantity: '25',
      order_image: require('../../../assets/Images/earing.png'),
    },
    {
      id: '1',
      order_name: 'Royal Gold Ring',
      order_product_Id: '#0124',
      order_status: 'Order Placed',
      order_Id: '#0124',
      order_quantity: '5',
      order_image: require('../../../assets/Images/bangle.png'),
    },
    {
      id: '2',
      order_name: 'Royal Gold Ring',
      order_product_Id: '#3456',
      order_status: 'Delivered',
      order_Id: '#0124',
      order_quantity: '15',
      order_image: require('../../../assets/Images/bracelet.png'),
    },
    {
      id: '3',
      order_name: 'Royal Gold Ring',
      order_product_Id: '#007',
      order_status: 'Order Placed',
      order_Id: '#007',
      order_quantity: '10',
      order_image: require('../../../assets/Images/pen.png'),
    },
  ]);
  const [selectItem, setSelectItem] = useState('0');

  const selectedItem = item => {
    try {
      setSelectItem(item.id);
    } catch (error) {
      console.log('catch in selected_Item : ', error);
    }
  };
  // GET MY ORDERS API FUNCTION :
  const GetMyOrders = async () => {
    try {
      const MyOrders = await fetchData?.MyOrders();
      if (MyOrders?.success == true) {
        setmyorder(MyOrders?.data);
        console.log('Suucess the get Api');
        console.log(MyOrders?.data);
      } else {
        console.log('Failed To Get My Orders');
      }
    } catch (error) {
      console.log('catch in GetMyOrders : ', error);
    }
  };

  useEffect(() => {
    GetMyOrders();
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
              MyOrders
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
                {/* {cart_count ? cart_count : 0} */}1
              </Badge>
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
            <Iconviewcomponent
              Icontag={'Feather'}
              iconname={'search'}
              icon_size={24}
              icon_color={Color.cloudyGrey}
            />
            <Text
              style={{
                fontSize: 16,
                color: Color.Venus,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                paddingHorizontal: 10,
              }}>
              Search in orders
            </Text>
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
                        renderItem={({item, index}) => {
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
                            <View
                              style={{
                                width: scr_width / 1.05,
                                margin: 5,
                                elevation: 3,
                                marginVertical: 10,
                                backgroundColor: Color.white,
                                padding: 10,
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <View>
                                  <Image
                                    source={{
                                      uri: item?.products[0]?.product_id
                                        ?.images[0],
                                    }}
                                    style={{
                                      width: 120,
                                      height: 130,
                                      resizeMode: 'contain',
                                      borderRadius: 5,
                                    }}
                                  />
                                </View>
                                <View>
                                  <View style={{gap: 10}}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        color: Color.black,
                                        font: Manrope.Bold,
                                        textTransform: 'capitalize',
                                        width: scr_width / 1.8,
                                      }}
                                      numberOfLines={1}>
                                      {item?.products[0]?.product_id?.name}
                                    </Text>
                                    <View
                                      style={{flexDirection: 'row', gap: 5}}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: '#999999',
                                          fontFamily: Manrope.Regular,
                                        }}>
                                        Product ID
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: Color?.black,
                                          fontFamily: Manrope.Regular,
                                          width: scr_width / 2.5,
                                        }}
                                        numberOfLines={1}>
                                        #0124
                                      </Text>
                                    </View>
                                    <View
                                      style={{flexDirection: 'row', gap: 5}}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: '#666666',
                                          fontFamily: Manrope.Regular,
                                        }}>
                                        Quantity -
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: Color?.black,
                                          fontFamily: Manrope.Regular,
                                          width: scr_width / 2.5,
                                        }}
                                        numberOfLines={1}>
                                        25 items
                                      </Text>
                                    </View>
                                    <View
                                      style={{flexDirection: 'row', gap: 5}}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: '#666666',
                                          fontFamily: Manrope.Regular,
                                        }}>
                                        Weight -
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: Color?.black,
                                          fontFamily: Manrope.Regular,
                                          width: scr_width / 2.5,
                                        }}
                                        numberOfLines={1}>
                                        250g
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View style={{flexDirection: 'row', margin: 7,gap:5}}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: '#666666',
                                    fontFamily: Manrope.Regular,
                                  }}>
                                   Order ID -
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color?.black,
                                    fontFamily: Manrope.Regular,
                                    width: scr_width / 1.4,
                                    // backgroundColor:'red'
                                  }}
                                  numberOfLines={1}>
                                  #PX2356498764AJLQW
                                </Text>
                              </View>
                            </View>
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
