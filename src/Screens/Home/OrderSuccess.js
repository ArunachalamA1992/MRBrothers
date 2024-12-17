import {
  BackHandler,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { LottieCheck } from '../../Components/Lottie';
import { Manrope } from '../../Global/FontFamily';
import Color from '../../Global/Color';
import { Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fetchData from '../../Config/fetchData';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { setcart, setCartCount } from '../../Redux/user/UserAction';
import { useDispatch } from 'react-redux';

const OrderSuccess = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [QRcode, setQRcode] = useState(null);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('TabNavigator', { screen: 'HomeTab' });
      console.log(
        "navigation.navigate('TabNavigator', {screen: 'MyOrderTab'});",
      );
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const GetQRCode = async () => {
    try {
      const getqrcode = await fetchData?.Get_QR_Code();
      if (getqrcode?.success == true) {
        setQRcode(getqrcode?.data);
      } else {
        setQRcode(null);
      }
    } catch (error) {
      console.log('catch in GetQRCode : ', error);
    }
  };
  const get_Cart_Count = async () => {
    try {
      // const Cartcount = await Cart_List
      const Cartcount = await fetchData?.Cart_List();
      if (Cartcount?.success == true) {
        console.log('verrrrrrrrrrr');
        console.log(Cartcount?.data?.length, '{{{{');
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
  // UseEffect

  useEffect(() => {
    GetQRCode();
    get_Cart_Count();
  }, []);
  return (
    <View style={{ backgroundColor: Color?.white, flex: 1 }}>
      {/* <View>
        <Text>Order placed</Text>
      </View> */}
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
          gap: 5,
        }}>
        <TouchableOpacity
          style={{
            width: '90%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color?.white,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: Color.primary,
          }}
          onPress={() => setModalVisible(true)}>
          <Text
            style={{
              fontSize: 16,
              color: Color.primary,
              textTransform: 'uppercase',
            }}>
            Pay QR code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TabNavigator', { screen: 'MyOrderTab' })
          }
          style={{
            width: '90%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.primary,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.white,
              textTransform: 'uppercase',
            }}>
            View Order
          </Text>
        </TouchableOpacity>
      </View>
      {/* QR CODE MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, backgroundColor: Color?.white, padding: 10 }}>
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
                textTransform: 'uppercase',
              }}>
              QR CODE
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {QRcode == null ?
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>No Data</Text>
              </View>
              : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: QRcode[0]?.image }}
                    style={{
                      width: scr_width / 0.9,
                      height: scr_height / 1.7,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              )}
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: Color?.primary,
                borderRadius: 10,
                padding: 15,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={{
                  color: Color?.white,
                  textAlign: 'center',
                  fontSize: 14,
                  textTransform: 'capitalize',
                  fontWeight: '600',
                  fontFamily: Manrope.SemiBold,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({});
