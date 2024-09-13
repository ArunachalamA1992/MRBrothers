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
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {scr_width, scr_height} from '../../Utils/Dimensions';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Alert} from 'react-native';
import {LottieCheck} from '../../Components/Lottie';
import {useNavigation} from '@react-navigation/native';
import fetchData from '../../Config/fetchData';
import {ToastAndroid} from 'react-native';

// create a component
const MyCart = () => {
  const navigation = useNavigation();
  const [Cartdata, setCartdata] = useState([]);
  const [height, setHeight] = useState(undefined);
  const [shopSection] = useState([
    {id: 1, title: 'CartItem', data: ['CartItem']},
    {id: 2, title: 'Category', data: ['Category']},
  ]);
  const [confirmModal, setConfirmModal] = useState(false);

  //  Get Cart API
  const Get_Cart = async () => {
    try {
      const cart = await fetchData?.Cart_List();
      if (cart?.success == true) {
        setCartdata(cart?.data);
      } else {
        if (cart?.message == 'No Data found for this request') {
          setCartdata([]);
        } else {
          console.log('Failed To Get Cart');
        }
      }
    } catch (error) {
      console.log('catch in Get_Cart : ', error);
    }
  };
  useEffect(() => {
    Get_Cart();
  }, []);

  // Delete API from Cart
  const deleteApi = async item => {
    try {
      const DeleteCart = await fetchData?.Delete_Cart(item._id);
      if (DeleteCart?.success == true) {
        Get_Cart();
        ToastAndroid.show('Item deleted successfully', ToastAndroid.SHORT);
      } else {
        console.log('Failed To Delete Cart');
      }
    } catch (error) {
      console.log('catch in deleteApi : ', error);
    }
  };
  // Delete item from Cart
  const removeItemClick = item => {
    try {
      Alert.alert(
        'MR Brothers',
        'Are you sure you want to remove this item?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              deleteApi(item);
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log('catch in change_Country : ', error);
    }
  };

  // Remove Cart
  const removeCart = async item => {
    try {
      const Quantity = item?.quantity - 1;
      if (Quantity == 0) {
        ToastAndroid.show("Quantity can't be zero", ToastAndroid.SHORT);
      } else {
        const data = {
          quantity: Quantity,
        };
        const Cart_item_Update = await fetchData?.Add_To_Cart(data, item?._id);
        if (Cart_item_Update?.success == true) {
          console.log(Cart_item_Update, 'Successfully Removed To Cart');
          Get_Cart();
        } else {
          console.log('Failed To Add To Cart');
        }
      }
    } catch (error) {
      console.log('catch in removeCart : ', error);
    }
  };

  // Add To Cart
  const AddToCart = async item => {
    try {
      const Quantity = item?.quantity + 1;
      const data = {
        quantity: Quantity,
      };
      const Cart_item_Update = await fetchData?.Add_To_Cart(data, item?._id);
      if (Cart_item_Update?.success == true) {
        Get_Cart();
        console.log('Successfully Added To Cart');
      } else {
        console.log('Failed To Add To Cart');
      }
    } catch (error) {
      console.log('catch in AddToCart : ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.primary} barStyle={'light-content'} />
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
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
                case 'CartItem':
                  return (
                    <View
                      style={{
                        width: '100%',
                        height: height,
                        alignItems: 'center',
                        marginBottom: 30,
                      }}>
                      {Cartdata?.length == 0 ? (
                        <View
                          style={{
                            height: scr_height / 1.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: Color.primary,
                              fontSize: 16,
                              fontWeight: 'bold',
                            }}>
                            No Product Found
                          </Text>
                        </View>
                      ) : (
                        <FlatList
                          data={Cartdata}
                          keyExtractor={(item, index) => item + index}
                          showsVerticalScrollIndicator={false}
                          // ListEmptyComponent={() => {

                          // }}
                          renderItem={({item, index}) => {
                            return (
                              <View
                                style={{
                                  width: scr_width,
                                  margin: 5,
                                  elevation: 3,
                                  marginVertical: 10,
                                  paddingVertical: 10,
                                  backgroundColor: Color.white,
                                }}
                                key={index}>
                                <View
                                  style={{width: '100%', flexDirection: 'row'}}>
                                  <TouchableOpacity
                                    style={{
                                      flex: 1.5,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      padding: 10,
                                      borderRadius: 5,
                                    }}>
                                    <Image
                                      source={{
                                        uri: item?.product_id?.images[0],
                                      }}
                                      style={{
                                        width: 130,
                                        height: 140,
                                        resizeMode: 'contain',
                                        borderRadius: 5,
                                      }}
                                    />
                                  </TouchableOpacity>
                                  <View
                                    style={{
                                      flex: 3,
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-start',
                                      paddingHorizontal: 10,
                                    }}>
                                    <View
                                      style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingVertical: 10,
                                      }}>
                                      <View
                                        style={{
                                          flex: 2,
                                          justifyContent: 'flex-start',
                                          alignItems: 'flex-start',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: Color.black,
                                            font: Manrope.Bold,
                                            paddingVertical: 3,
                                          }}
                                          numberOfLines={2}>
                                          {item?.product_id?.name}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 13,
                                            color: Color.cloudyGrey,
                                            fontFamily: Manrope.Medium,
                                            paddingVertical: 3,
                                          }}
                                          numberOfLines={1}>
                                          Product-ID:
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              color: Color.lightBlack,
                                              fontFamily: Manrope.SemiBold,
                                            }}>
                                            {item?._id}
                                          </Text>
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: 'flex-end',
                                          alignItems: 'flex-end',
                                          paddingHorizontal: 10,
                                        }}>
                                        <TouchableOpacity
                                          onPress={() => removeItemClick(item)}>
                                          <Iconviewcomponent
                                            Icontag={'AntDesign'}
                                            iconname={'delete'}
                                            icon_size={24}
                                            icon_color={Color.cloudyGrey}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        width: '95%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}>
                                      <View
                                        style={{
                                          flex: 1,
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 13,
                                            color: Color.cloudyGrey,
                                            fontFamily: Manrope.Medium,
                                          }}>
                                          Size -{' '}
                                        </Text>
                                        {/* <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold }}>{item?.product_id?.size_variants[0]}</Text> */}
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            color: Color.lightBlack,
                                            fontFamily: Manrope.SemiBold,
                                          }}>
                                          {item?.size_variant}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          width: 1,
                                          height: '100%',
                                          backgroundColor: Color.cloudyGrey,
                                        }}></View>
                                      <View
                                        style={{
                                          flex: 1,
                                          flexDirection: 'row',
                                          justifyContent: 'flex-end',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 13,
                                            color: Color.cloudyGrey,
                                            fontFamily: Manrope.Medium,
                                          }}>
                                          Weight -{' '}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            color: Color.lightBlack,
                                            fontFamily: Manrope.SemiBold,
                                          }}>
                                          {item?.product_id?.net_weight} g
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        width: '95%',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingVertical: 10,
                                      }}>
                                      <TouchableOpacity
                                        style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          padding: 10,
                                          paddingHorizontal: 10,
                                          backgroundColor: Color.lightgrey,
                                          borderRadius: 5,
                                          // borderRightWidth: 1,
                                          borderRightColor: Color.cloudyGrey,
                                        }}
                                        onPress={() => removeCart(item)}>
                                        <Iconviewcomponent
                                          Icontag={'AntDesign'}
                                          iconname={'minus'}
                                          icon_size={18}
                                          icon_color={Color.black}
                                        />
                                      </TouchableOpacity>
                                      <View
                                        style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          paddingHorizontal: 15,
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            color: Color.cloudyGrey,
                                            fontFamily: Manrope.SemiBold,
                                          }}>
                                          {item?.quantity}
                                        </Text>
                                      </View>
                                      <TouchableOpacity
                                        style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          padding: 10,
                                          paddingHorizontal: 10,
                                          backgroundColor: Color.primary,
                                          borderRadius: 5,
                                          // borderLeftWidth: 1,
                                          borderLeftColor: Color.cloudyGrey,
                                        }}
                                        onPress={() => AddToCart(item)}>
                                        <Iconviewcomponent
                                          Icontag={'AntDesign'}
                                          iconname={'plus'}
                                          icon_size={18}
                                          icon_color={Color.white}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            );
                          }}
                          style={{width: '100%'}}
                        />
                      )}
                    </View>
                  );
              }
            }}
          />
        </View>
        {Cartdata?.length == 0 ? null : (
          <View style={{width: '100%', alignItems: 'center', bottom: 20}}>
            <TouchableOpacity
              onPress={() => setConfirmModal(true)}
              style={{
                width: '95%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.primary,
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 14, color: Color.white}}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        )}
        <Modal visible={confirmModal} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <Pressable
              onPress={() => setConfirmModal(false)}
              style={styles.pressableOverlay}
            />
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Order Placed Successfully</Text>
                <TouchableOpacity
                  onPress={() => setConfirmModal(false)}
                  style={styles.closeButton}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={30}
                    icon_color={Color.cloudyGrey}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%', height: '85%'}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '80%',
                      alignItems: 'center',
                    }}>
                    <LottieCheck />
                    <Text
                      style={{
                        fontSize: 26,
                        color: Color.black,
                        fontFamily: Manrope.SemiBold,
                        paddingVertical: 5,
                      }}>
                      Order Confirmed !
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                        paddingVertical: 2,
                      }}>
                      We will send a confirmation email to
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.lightBlack,
                        fontFamily: Manrope.SemiBold,
                        paddingVertical: 2,
                      }}>
                      info@mrbrothers.com
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    bottom: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('TabNavigator')}
                    style={{
                      width: '90%',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Color.primary,
                      borderRadius: 5,
                    }}>
                    <Text style={{fontSize: 16, color: Color.white}}>
                      View Order
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
  modalBackground: {
    flex: 1,
    backgroundColor: Color.transparantBlack,
  },
  pressableOverlay: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: Color.white,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 10,
    color: Color.black,
    fontFamily: Manrope.Bold,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Color.lightgrey,
    borderRadius: 10,
  },
});

//make this component available to the app
export default MyCart;
