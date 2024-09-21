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
import { Iconviewcomponent } from '../../Components/Icontag';
import { Manrope } from '../../Global/FontFamily';
import { Badge } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../../Global/Color';
import fetchData from '../../Config/fetchData';
import moment from 'moment';
const OrderSummary = ({ route, navigation }) => {
  const Route_Data = route?.params;
  console.log(Route_Data?.OrderData?._id, 'Route_DataRoute_DataRoute_DataRoute_DataRoute_Data');

  const cart_count = useSelector(state => state.UserReducer.Cart_Count);
  const { width, height } = Dimensions.get('window');
  const [Orderdetails, setOrderdetails] = useState([]);
  const [CategoryData, setCategoryData] = useState([
    {
      id: '0',
      cat_image: require('../../assets/Images/ring.png'),
      cat_name: 'Antique Ring',
      cat_product: '20',
      total: '70',
      product_id: '0124',
    },
    {
      id: '1',
      cat_image: require('../../assets/Images/bangle.png'),
      cat_name: 'Band Rings',
      cat_product: '15',
      total: '70',
      product_id: '0124',
    },
    {
      id: '2',
      cat_image: require('../../assets/Images/chain.png'),
      cat_name: 'Casual Rings',
      cat_product: '5',
      total: '70',
      product_id: '0124',
    },
    {
      id: '3',
      cat_image: require('../../assets/Images/earing.png'),
      cat_name: 'Diamond rings',
      cat_product: '10',
      total: '70',
      product_id: '0124',
    },
    {
      id: '4',
      cat_image: require('../../assets/Images/ring.png'),
      cat_name: 'Engagement rings',
      cat_product: '55',
      total: '70',
      product_id: '0124',
    },
    {
      id: '5',
      cat_image: require('../../assets/Images/ring.png'),
      cat_name: 'Platinum rings for men',
      cat_product: '30',
      total: '70',
      product_id: '0124',
    },
    {
      id: '6',
      cat_image: require('../../assets/Images/ring.png'),
      cat_name: 'Engagement rings',
      cat_product: '55',
      total: '70',
      product_id: '0124',
    },
    {
      id: '7',
      cat_image: require('../../assets/Images/ring.png'),
      cat_name: 'Platinum rings for men',
      cat_product: '30',
      total: '70',
      product_id: '0124',
    },
    {
      id: '8',
      cat_image: require('../../assets/Images/ring.png'),
      cat_name: 'Engagement rings',
      cat_product: '55',
      total: '70',
      product_id: '0124',
    },
    {
      id: '9',
      cat_image: require('../../assets/Images/ring.png'),
      cat_name: 'Platinum rings for men',
      cat_product: '30',
      total: '70',
      product_id: '0124',
    },
  ]);
  // GET ORDER DETAILS API FUNCTION :
  const GetOrderDetails = async (item) => {
    try {
      const getorderDetails = await fetchData?.Get_Order_Details(item);
      if (getorderDetails?.success == true) {
        setOrderdetails(getorderDetails?.data);
        console.log(getorderDetails?.data, 'Suucess the get Api');
        
      } else {
        console.log('Failed To Get Order Details');
      }

    } catch (error) {
      console.log('catch in GetOrderDetails : ', error);
    }
  }

  useEffect(() => {
    GetOrderDetails(Route_Data?.OrderData?._id);
  }, []);
  const GetTotalQuantity = async (items) => {
    console.log(items,"RRRRRR");
    return "hdjbjgbjk";
    
    // console.log(items?.weight_variant,'item?.weight_variantitem?.weight_variant');
    
    // let totalWeight = 0; // Use let to allow reassignment
    // await Promise.all(items?.map(data => {
    //   totalWeight += parseFloat(data?.weight_variant); // Convert to float and add
    // }));
    // console.log(totalWeight, 'Weight');
  };
  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingTop: 15, paddingBottom: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: item?.product_id?.images[0] }}
            style={{
              width: 98,
              height: 76,
              padding: 5,
              resizeMode: 'contain',
            }}
          />
          <View style={{ width: width / 2 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Manrope.SemiBold,
                color: Color?.black,
                // backgroundColor:'red'
              }}
              numberOfLines={1}>
              {item?.product_id?.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Manrope.Regular,
                color: '#999999',
              }}>
              Product ID <Text>#{item?.product_id?.product_code}</Text>
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Manrope.Regular,
                color: '#666666',
              }}>
              Total -
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Manrope.Medium,
                  color: Color.black,
                }}>
               {item?.weight_variant}g
              </Text>
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: Color?.primary,
                fontFamily: Manrope.SemiBold,
              }}>
              x{item?.quantity}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
            Order Summary
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
      <View
        style={{
          padding: 24,
          gap: 15,
          backgroundColor: Color.white,
          marginTop: 2,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Manrope.SemiBold,
            color: Color.black,
          }}>
          Order Details
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Regular,
              color: '#666666',
            }}>
            Order Date
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Medium,
              color: '#111111',
            }}>
            {moment(Orderdetails?.createdAt).format('DD MMMM YYYY')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Regular,
              color: '#666666',
            }}>
            Order ID
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Medium,
              color: '#111111',
            }}>
            {Orderdetails?.order_id}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 24,
          gap: 15,
          backgroundColor: Color.white,
          marginTop: 5,
        }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Manrope.SemiBold,
              color: Color.black,
            }}>
            Contact information
          </Text>
        </View>
        <View style={{ gap: 5 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Medium,
              color: Color.black,
            }}>
            {Orderdetails?.user_id?.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Regular,
              color: '#666666',
            }}>
            {`+91 ${Orderdetails?.user_id?.mobile}`}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Regular,
              color: '#666666',
            }}>
            {`${Orderdetails?.user_id?.address_line}, ${Orderdetails?.user_id?.city},${Orderdetails?.user_id?.state} ${Orderdetails?.user_id?.pincode}`}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 24,
          gap: 15,
          backgroundColor: Color.white,
          marginTop: 5,
        }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Manrope.SemiBold,
              color: Color.black,
            }}>
            Items Ordered
          </Text>
        </View>
        <View>
          <FlatList
            data={Orderdetails?.products}
            renderItem={item => renderItem(item)}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <View
        style={{
          padding: 24,
          gap: 15,
          backgroundColor: Color.white,
          marginTop: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Manrope.SemiBold,
            color: Color.black,
          }}>
          Total Order
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Regular,
              color: '#666666',
            }}>
            Total Quantity
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Medium,
              color: '#111111',
            }}>
            {/* {GetTotalQuantity()} */}
            
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Regular,
              color: '#666666',
            }}>
            Total Weight
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Medium,
              color: '#111111',
            }}>
            750g
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Color?.white,
          marginTop: 5,
          padding: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Manrope.SemiBold,
              color: Color.black,
            }}>
            750 g{' '}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: Manrope.Medium,
              color: '#666666',
            }}>
            30 Items
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Color?.primary,
            width: width / 1.8,
            height: height / 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: Manrope.SemiBold,
            }}>
            Download invoice
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({});
