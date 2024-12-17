//import liraries
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  BackHandler,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useNavigation} from '@react-navigation/native';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {ToastAndroid} from 'react-native';
import fetchData from '../../Config/fetchData';
import RBSheet from 'react-native-raw-bottom-sheet';

// create a component

const StoreRegister = ({route}) => {
  const refRBSheet = useRef();
  const refRBSheet001 = useRef();
  const navigation = useNavigation();
  const Route_Data = route.params;
  // Declare UseState
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [gst, setGst] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedcity, setSelectedcity] = useState('');
  const [pincode, setPincode] = useState('');
  // const [error, setError] = useState({
  //     name: null,
  //     gst: null,
  //     buildingName: null,
  //     street: null,
  //     number: null,
  //     state: null,
  //     city: null,
  //     pincode: null,
  // });
  //   const [error, setError] = useState('');
  const fetchState = async () => {
    const City = await fetchData?.City_List(null, null);
    const State = await fetchData?.State_List(null, null);
    if (City?.success == true) {
      setCity(City?.data);
    } else {
      console.log('Failed To Get City');
    }
    if (State?.success == true) {
      setState(State?.data);
    } else {
      console.log('Failed To Get State');
    }
  };
  useEffect(() => {
    fetchState();
  }, []);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  const handleBackPress = () => {
    console.log('Back button pressed');
    return true;
  };
  const validation = async () => {
    if (
      name == '' ||
      gst == '' ||
      buildingName == '' ||
      street == '' ||
      selectedState == '' ||
      selectedcity == '' ||
      pincode == ''
    ) {
      ToastAndroid.show(
        'Please select all the mandatory fields',
        ToastAndroid.SHORT,
      );
      setLoading(false);
      return false;
    } else {
      if (pincode.length != 6) {
        ToastAndroid.show('Please enter valid pincode', ToastAndroid.SHORT);
        setLoading(false);
        return false;
      } else {
        setLoading(false);
        return true;
      }
    }
  };
  const Register_Function = async () => {
    setLoading(true);
    try {
      const IS_validation = await validation();
      if (IS_validation) {
        const Data = {
          name: Route_Data?.userdata?.name,
          email: Route_Data?.userdata?.email,
          mobile: Route_Data?.userdata?.mobilenumber,
          gst: gst,
          shop_name: name,
          building_address: buildingName,
          address_line: street,
          //   address_line: ,
          city: selectedcity,
          state: selectedState,
          // city: 'Delhi',
          // state: 'Delhi',
          pincode: pincode,
        };
        console.log('DataDataDataee', Data);
        console.log('Route_Data?.token44444444444', Route_Data?.token);

        const Register = await fetchData?.New_user_Register(
          Data,
          Route_Data?.token,
        );
        if (Register?.success == true) {
          setLoading(false);
          ToastAndroid.show('Register Successfully', ToastAndroid.SHORT);
          navigation.navigate('Login');
        } else {
          if (Register?.success == false) {
            setLoading(false);
            ToastAndroid.show(Register?.message, ToastAndroid.SHORT);
          } else {
            setLoading(false);
            // console.log('ihhbbbbbbbbbbbb', Register);

            // ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
          }
        }
      } else {
        setLoading(false);
        console.log('ihhbbbbbbbbbbbb', IS_validation);

        // ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Catch in Register Function', error);
      if (Platform.OS === 'android') {
        setLoading(false);
        // ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      } else {
        setLoading(false);
        alert('Something went wrong');
      }
    }
  };
  const Get_City_Place = async item => {
    const City = await fetchData?.City_List_Place(item?._id, null);
    if (City?.success == true) {
      setCity(City?.data);
    } else {
      console.log('Failed To Get City');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 0,
            width: '100%',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.6,
            backgroundColor: Color.white,
          }}>
          <ImageBackground
            source={require('../../assets/Images/verify.jpg')}
            style={styles.image}
          />
        </View>
        <View
          style={{
            flex: 2,
            top: 50,
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{width: '95%', padding: 10, marginTop: 20}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 26,
                color: Color.black,
                fontFamily: Manrope.Bold,
              }}>
              Introduce Your Store
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 15,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                paddingVertical: 5,
              }}>
              Present Your Shop to MR Brothers
            </Text>
          </View>
          <View style={{width: '95%', padding: 10}}>
            <View style={{marginVertical: 0}}>
              <View style={styles.NumberBoxConatiner}>
                <TextInput
                  placeholder={'Enter your shop name'}
                  placeholderTextColor={Color.cloudyGrey}
                  value={name}
                  // maxLength={10}
                  autoFocus={false}
                  keyboardType="name-phone-pad"
                  onChangeText={input => {
                    setName(input);
                  }}
                  style={styles.numberTextBox}
                />
                <View style={styles.numberCountryCode}>
                  <Iconviewcomponent
                    Icontag={'Feather'}
                    iconname={'user'}
                    icon_size={20}
                    iconstyle={{color: Color.cloudyGrey}}
                  />
                </View>
              </View>
            </View>
            <View style={{marginVertical: 20}}>
              <View style={styles.NumberBoxConatiner}>
                <TextInput
                  style={styles.numberTextBox}
                  placeholder="Enter your GST number"
                  placeholderTextColor={Color.cloudyGrey}
                  value={gst}
                  onChangeText={value => {
                    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
                    setGst(filteredValue);
                  }}
                  keyboardType="default"
                  maxLength={15}
                />
                <View style={styles.numberCountryCode}>
                  <Image
                    source={require('../../assets/Images/gst.png')}
                    style={{
                      width: 28,
                      height: 28,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 18,
                color: Color.lightBlack,
                fontFamily: Manrope.SemiBold,
              }}>
              Enter your shop address
            </Text>
            <View style={{marginVertical: 10}}>
              <View style={styles.NumberBoxConatiner}>
                <TextInput
                  placeholder={'Building Name'}
                  placeholderTextColor={Color.cloudyGrey}
                  value={buildingName}
                  // maxLength={10}
                  autoFocus={false}
                  keyboardType="name-phone-pad"
                  onChangeText={input => {
                    setBuildingName(input);
                  }}
                  style={styles.numberTextBox}
                />
                <View style={styles.numberCountryCode}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome'}
                    iconname={'building-o'}
                    icon_size={20}
                    iconstyle={{color: Color.cloudyGrey}}
                  />
                </View>
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <View style={styles.NumberBoxConatiner}>
                <TextInput
                  placeholder={'Street Name / Area'}
                  placeholderTextColor={Color.cloudyGrey}
                  value={street}
                  // maxLength={10}
                  autoFocus={false}
                  keyboardType="name-phone-pad"
                  onChangeText={input => {
                    setStreet(input);
                  }}
                  style={styles.numberTextBox}
                />
                <View style={styles.numberCountryCode}>
                  <Iconviewcomponent
                    Icontag={'Feather'}
                    iconname={'map-pin'}
                    icon_size={20}
                    iconstyle={{color: Color.cloudyGrey}}
                  />
                </View>
              </View>
            </View>
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
                  flex: 1,
                  borderWidth: 0.5,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: Color.cloudyGrey,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Image
                    source={require('../../assets/Images/flag.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.SemiBold,
                    paddingHorizontal: 10,
                  }}>
                  India
                </Text>
              </View>
              <View
                style={{
                  width: 10,
                  height: 'auto',
                  backgroundColor: Color.white,
                }}></View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderWidth: 0.5,
                  paddingVertical: 15,
                  borderRadius: 5,
                  borderColor: Color.cloudyGrey,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() => refRBSheet.current.open()}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.SemiBold,
                    paddingHorizontal: 10,
                  }}>
                  {selectedState ? selectedState : 'State'}
                </Text>
                <View style={{paddingHorizontal: 10}}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'chevron-small-down'}
                    icon_size={20}
                    iconstyle={{color: Color.cloudyGrey}}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderWidth: 0.5,
                  paddingVertical: 15,
                  borderRadius: 5,
                  borderColor: Color.cloudyGrey,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() =>
                  selectedState
                    ? refRBSheet001.current.open()
                    : ToastAndroid.show(
                        'Please Select a State ',
                        ToastAndroid.SHORT,
                      )
                }>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.SemiBold,
                    paddingHorizontal: 10,
                  }}>
                  {selectedcity ? selectedcity : 'City'}
                </Text>
                <View style={{paddingHorizontal: 10}}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'chevron-small-down'}
                    icon_size={20}
                    iconstyle={{color: Color.cloudyGrey}}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: 10,
                  height: 'auto',
                  backgroundColor: Color.white,
                }}></View>
              <View
                style={{
                  flex: 1,
                  borderWidth: 0.5,
                  borderRadius: 5,
                  borderColor: Color.cloudyGrey,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder={'Pincode'}
                  placeholderTextColor={Color.cloudyGrey}
                  value={pincode}
                  maxLength={6}
                  autoFocus={false}
                  keyboardType="number-pad"
                  onChangeText={input => {
                    setPincode(input);
                  }}
                  style={{
                    width: '100%',
                    height: 55,
                    borderLeftColor: Color.Venus,
                    borderLeftWidth: 1,
                    color: Color.black,
                    fontSize: 14,
                    padding: 5,
                    paddingTop: 5,
                    paddingHorizontal: 10,
                    fontFamily: Manrope.SemiBold,
                    alignItems: 'flex-start',
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => Register_Function()}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 20,
                backgroundColor: Color.primary,
                borderColor: Color.primary,
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* State bottom Sheet */}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={500}
          customStyles={{
            wrapper: {
              backgroundColor: '#00000088',
            },
            container: {
              backgroundColor: 'white',
            },
          }}>
          <View style={{margin: 20, gap: 10}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Manrope.SemiBold,
                  color: Color.primary,
                  textAlign: 'center',
                }}>
                Select State
              </Text>
            </View>
            <ScrollView style={{marginBottom: 35}}>
              {state?.map((item, index) => {
                const is_Selected = selectedState == item?.name;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      refRBSheet.current.close();
                      Get_City_Place(item);
                      // console.log(item,'????');
                      setSelectedState(item?.name);
                    }}
                    style={{
                      padding: 10,
                      borderWidth: 1,
                      borderColor: is_Selected ? Color.primary : '#E5E5E5',
                      borderRadius: 5,
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        color: Color?.black,
                        fontSize: 14,
                        fontFamily: Manrope.SemiBold,
                        textAlign: 'center',
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                  // <Text>lbnnkk</Text>
                );
              })}
            </ScrollView>
          </View>
        </RBSheet>
        <RBSheet
          ref={refRBSheet001}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={500}
          customStyles={{
            wrapper: {
              backgroundColor: '#00000088',
            },
            container: {
              backgroundColor: 'white',
            },
          }}>
          <View style={{margin: 20, gap: 10}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Manrope.SemiBold,
                  color: Color.primary,
                  textAlign: 'center',
                }}>
                Select city
              </Text>
            </View>
            <ScrollView style={{marginBottom: 35}}>
              {city?.map((item, index) => {
                const is_Selected = selectedcity == item?.name;
                console.log(is_Selected, 'is_Selectedis_Selected');

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      refRBSheet001.current.close();
                      setSelectedcity(item?.name);
                    }}
                    style={{
                      padding: 10,
                      borderWidth: 1,
                      borderColor: is_Selected ? Color.primary : '#E5E5E5',
                      borderRadius: 5,
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        color: Color?.black,
                        fontSize: 14,
                        fontFamily: Manrope.SemiBold,
                        textAlign: 'center',
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                  // <Text>lbnnkk</Text>
                );
              })}
            </ScrollView>
          </View>
        </RBSheet>
      </ScrollView>
    </View>
  );
};

// define your styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  image: {
    width: scr_width,
    height: scr_height,
    resizeMode: 'contain',
  },
  NumberBoxConatiner: {
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.black,
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: Manrope.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  invalidLogin: {
    fontSize: 12,
    fontFamily: Manrope.Light,
    color: Color.red,
    textAlign: 'left',
    marginTop: 10,
  },
  numberTextBox: {
    flex: 1,
    display: 'flex',
    height: 55,
    borderLeftColor: Color.Venus,
    borderLeftWidth: 1,
    color: Color.black,
    fontSize: 14,
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 10,
    fontFamily: Manrope.SemiBold,
    alignItems: 'flex-start',
  },
});

export default StoreRegister;
