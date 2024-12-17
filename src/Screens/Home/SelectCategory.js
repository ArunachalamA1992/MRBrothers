//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {TouchableOpacity} from 'react-native';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import fetchData from '../../Config/fetchData';
import {scr_width} from '../../Utils/Dimensions';
import {Badge} from 'react-native-paper';

// create a component
const SelectCategory = ({route}) => {
  const CategoryDatas = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [netInfo_State, setNetinfo] = useState(true);
  const cart_count = useSelector(state => state.UserReducer.Cart_Count);
  const [loader, setloader] = useState(false);

  const [CategoryData, setCategoryData] = useState([]);
  const [category_Data, setCategory_Data] = useState([]);
  const [notificationcount, setNotificationcount] = useState(0);
  //  GET CATEGORIES API FUNCTION :

  const GetSubCategories = async id => {
    const getSubCategories = await fetchData?.Get_SubCategories(id);
    if (getSubCategories?.success == true) {
      setCategoryData(getSubCategories?.data);
    } else {
      setCategoryData([]);
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
    GetSubCategories(CategoryDatas?.CategoryList?._id);
    Notification();
    setloader(true);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.softGrey}}>
      {loader == false ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" color={Color.primary} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              width: scr_width,
              backgroundColor: Color?.white,
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 15,
              paddingBottom: 15,
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
                gap: 19,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'left'}
                  icon_size={24}
                  icon_color={Color.black}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: Color?.black,
                  fontSize: 18,
                  fontWeight: '500',
                  fontFamily: Manrope?.Medium,
                }}>
                Select Category
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
                  icon_size={24}
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
            <View style={{width: '100%', backgroundColor: Color.softGrey}}>
              <FlatList
                data={CategoryData}
                keyExtractor={(item, index) => item + index}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (item?.product_count == 0) {
                          ToastAndroid.show(
                            'No Product Available for this category',
                            ToastAndroid.SHORT,
                          );
                        } else {
                          navigation.navigate('ProductListing', {
                            CategoryList: CategoryDatas?.CategoryList,
                            keywords: false,
                            sub_category: item,
                          });
                        }
                      }}
                      style={{
                        width: '98%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: Color.white,
                        padding: 10,
                        margin: 5,
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 80,
                          width: 100,
                        }}>
                        <Image
                          source={{uri: item?.image}}
                          style={{
                            width: '100%',
                            height: '100%',
                            padding: 5,
                            borderRadius: 5,
                            resizeMode: 'cover',
                            backgroundColor: Color.softGrey,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            font: Manrope.Medium,
                            letterSpacing: 0.5,
                            fontWeight: '500',
                            textTransform: 'capitalize',
                          }}>
                          {item?.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.cloudyGrey,
                            font: Manrope.Regular,
                            paddingVertical: 5,
                            letterSpacing: 0.5,
                            fontWeight: '400',
                          }}>
                          {item?.product_count} products
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          Icontag={'Ionicons'}
                          iconname={'chevron-forward'}
                          icon_size={20}
                          icon_color={Color.cloudyGrey}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: scr_width / 1.2,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.primary,
                        font: Manrope.Bold,
                        letterSpacing: 0.5,
                      }}>
                      No Category Found
                    </Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                style={{margin: 5}}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default SelectCategory;
