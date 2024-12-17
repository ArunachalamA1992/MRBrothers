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
  ToastAndroid,
  Pressable,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Iconviewcomponent} from '../../Components/Icontag';
import Color from '../../Global/Color';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {Manrope, Marcellus} from '../../Global/FontFamily';
import RBSheet from 'react-native-raw-bottom-sheet';
import fetchData from '../../Config/fetchData';

const NewStoreRegister = ({route, navigation}) => {
  const refRBSheet = useRef();
  const refRBSheet001 = useRef();
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
        console.log('DataDataData', Data);
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
            console.log('ihhbbbbbbbbbbbb', Register?.message);

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
      setSelectedcity('');
    } else {
      console.log('Failed To Get City');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Color?.white}}>
      <ImageBackground
        source={require('../../assets/Images/create.jpg')} // Use your image path here
        style={styles.image}>
        <ScrollView
          style={{flex: 1, marginLeft: 24, gap: 30}}
          showsVerticalScrollIndicator={false}>
          <View style={{gap: 20}}>
            <View style={{marginTop: 67}}>
              <View style={{gap: 30}}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Register');
                  }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'arrowleft'}
                    icon_size={25}
                    iconstyle={{color: Color.black}}
                  />
                </Pressable>
                <View>
                  <View>
                    <Text
                      style={{
                        fontSize: 30,
                        fontFamily: Marcellus?.Marcellus_Regular,
                        color: Color.black,
                        fontWeight: '400',
                      }}>
                      Introduce Your Store
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        marginTop: 5,
                        fontFamily: Manrope.Regular,
                        color: '#666666',
                        fontWeight: '400',
                      }}>
                      Present Your Shop to MR Brothers
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles?.textinputContainer}>
              <TextInput
                placeholder={'Enter your shop name'}
                placeholderTextColor={Color.cloudyGrey}
                autoFocus={false}
                keyboardType="name-phone-pad"
                style={styles?.textinput}
                value={name}
                onChangeText={input => {
                  setName(input);
                }}
              />
              <Iconviewcomponent
                Icontag={'Feather'}
                iconname={'user'}
                icon_size={20}
                iconstyle={{color: Color.cloudyGrey}}
              />
            </View>
            <View style={styles?.textinputContainer}>
              <TextInput
                placeholder={'Enter your GST number'}
                placeholderTextColor={Color.cloudyGrey}
                autoFocus={false}
                keyboardType="default"
                maxLength={15}
                style={styles?.textinput}
                value={gst}
                onChangeText={value => {
                  const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
                  setGst(filteredValue);
                }}
              />
              <Image
                source={require('../../assets/Images/gst.png')}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  marginTop: 5,
                }}
              />
            </View>
            <View style={{gap: 20}}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: Color.lightBlack,
                    fontFamily: Manrope.SemiBold,
                    fontWeight: '400',
                  }}>
                  Enter your shop address
                </Text>
              </View>
              <View style={styles?.textinputContainer}>
                <TextInput
                  placeholder={'Building Name'}
                  placeholderTextColor={Color.cloudyGrey}
                  autoFocus={false}
                  value={buildingName}
                  keyboardType="name-phone-pad"
                  style={styles?.textinput}
                  onChangeText={input => {
                    setBuildingName(input);
                  }}
                />
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'building-o'}
                  icon_size={20}
                  iconstyle={{color: Color.cloudyGrey}}
                />
              </View>
              <View style={styles?.textinputContainer}>
                <TextInput
                  placeholder={'Street Name / Area'}
                  placeholderTextColor={Color.cloudyGrey}
                  autoFocus={false}
                  value={street}
                  keyboardType="name-phone-pad"
                  onChangeText={input => {
                    setStreet(input);
                  }}
                  style={styles?.textinput}
                />
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'map-pin'}
                  icon_size={20}
                  iconstyle={{color: Color.cloudyGrey}}
                />
              </View>
              <View style={styles?.flexContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                    width: scr_width / 2.5,
                    height: scr_height / 15,
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#DADFE3',
                    borderRadius: 5,
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

                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#666666',
                        fontFamily: Manrope.Regular,
                        fontWeight: '400',
                        textTransform: 'capitalize',
                      }}>
                      India
                    </Text>
                  </View>
                </View>
                {selectedState ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      gap: 15,
                      alignItems: 'center',
                      width: scr_width / 2.5,
                      height: scr_height / 15,
                      justifyContent: 'space-between',
                      paddingHorizontal: 21,
                      borderWidth: 1,
                      borderColor: '#DADFE3',
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      refRBSheet.current.open();
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666666',
                          fontFamily: Manrope.Regular,
                          fontWeight: '400',
                          textTransform: 'capitalize',
                        }}
                        numberOfLines={1}>
                        {selectedState}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      gap: 15,
                      alignItems: 'center',
                      width: scr_width / 2.5,
                      height: scr_height / 15,
                      justifyContent: 'space-between',
                      paddingHorizontal: 21,
                      borderWidth: 1,
                      borderColor: '#DADFE3',
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      refRBSheet.current.open();
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666666',
                          fontFamily: Manrope.Regular,
                          fontWeight: '400',
                          textTransform: 'capitalize',
                        }}>
                        State
                      </Text>
                    </View>

                    <View>
                      <Iconviewcomponent
                        Icontag={'AntDesign'}
                        iconname={'down'}
                        icon_size={20}
                        iconstyle={{color: Color.cloudyGrey}}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles?.flexContainer222}>
                {!selectedcity ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      gap: 15,
                      alignItems: 'center',
                      width: scr_width / 2.5,
                      height: scr_height / 15,
                      justifyContent: 'space-between',
                      paddingHorizontal: 21,
                      borderWidth: 1,
                      borderColor: '#DADFE3',
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      selectedState
                        ? refRBSheet001.current.open()
                        : ToastAndroid.show(
                            'Please Select a State ',
                            ToastAndroid.SHORT,
                          );
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666666',
                          textTransform: 'capitalize',
                        }}>
                        City
                      </Text>
                    </View>

                    <View>
                      <Iconviewcomponent
                        Icontag={'AntDesign'}
                        iconname={'down'}
                        icon_size={20}
                        iconstyle={{color: Color.cloudyGrey}}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      gap: 15,
                      alignItems: 'center',
                      width: scr_width / 2.5,
                      height: scr_height / 15,
                      justifyContent: 'space-between',
                      paddingHorizontal: 21,
                      borderWidth: 1,
                      borderColor: '#DADFE3',
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      selectedState
                        ? refRBSheet001.current.open()
                        : ToastAndroid.show(
                            'Please Select a State ',
                            ToastAndroid.SHORT,
                          );
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Manrope.Regular,
                          fontWeight: '400',
                          color: '#666666',
                          textTransform: 'capitalize',
                        }}
                        numberOfLines={1}>
                        {selectedcity}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                    width: scr_width / 2.5,
                    height: scr_height / 15,
                    justifyContent: 'space-between',
                    paddingHorizontal: 21,
                    borderWidth: 1,
                    borderColor: '#DADFE3',
                    borderRadius: 5,
                  }}>
                  <TextInput
                    placeholder={'Pin code'}
                    placeholderTextColor={Color.cloudyGrey}
                    maxLength={6}
                    value={pincode}
                    autoFocus={false}
                    onChangeText={input => {
                      setPincode(input);
                    }}
                    keyboardType="number-pad"
                    style={{
                      fontSize: 14,
                      color: '#666666',
                      fontFamily: Manrope.Regular,
                      fontWeight: '400',
                      textTransform: 'capitalize',
                    }}
                  />

                  <View></View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: Color?.primary,
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginHorizontal: 24,
          }}
          onPress={() => Register_Function()}>
          <Text
            style={{
              fontSize: 16,
              color: Color.white,
              fontFamily: Manrope.Medium,
              fontWeight: '500',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </ImageBackground>
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
    </View>
  );
};

export default NewStoreRegister;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: scr_width,
    height: scr_height / 2,
    resizeMode: 'stretch',
    opacity: 1,
  },
  textinputContainer: {
    borderWidth: 1,
    borderColor: '#DADFE3',
    borderRadius: 3,
    width: scr_width / 1.17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  textinput: {
    width: '80%',
    fontWeight: '400',
    fontFamily: Manrope.Regular,
    fontSize: 14,
  },
  flexContainer: {
    flexDirection: 'row',
    width: scr_width / 1.17,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexContainer222: {
    marginBottom: 20,
    flexDirection: 'row',
    width: scr_width / 1.17,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
