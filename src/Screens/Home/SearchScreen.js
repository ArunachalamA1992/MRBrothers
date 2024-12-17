import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Color from '../../Global/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import fetchData from '../../Config/fetchData';
import {Manrope} from '../../Global/FontFamily';

const SearchScreen = ({navigation}) => {
  const textInputRef = useRef(null);
  const [textdata, setTextdata] = useState('');
  const [SearchData, setSearchData] = useState(null);
  const [nodata, setNodata] = useState(false);

  // UseEffect to focus the TextInput
  useEffect(() => {
    // Automatically focus the TextInput when the screen is rendered
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  // Function to handle search
  const HandleSearch = async text => {
    try {
      const Search = await fetchData?.Get_Search_Data(text);
      if (Search?.success == true) {
        console.log('Search', Search);
        setNodata(true);
        setSearchData(Search?.data);
      } else {
        setSearchData([]);
      }
    } catch (error) {
      console.log('catch in HandleSearch', error);
    }
  };
  const Searchnavigationfun = data => {
    console.log('ckjdbdbvdjdv', data);
  };
  return (
    <View style={{flex: 1, backgroundColor: Color?.white}}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <AntDesign
          name="left"
          size={24}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{fontSize: 20, color: Color.black, marginLeft: 10}}>
          Back
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: scr_width - 20,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          borderWidth: 1,
          borderBottomLeftRadius:
            // (SearchData?.keywords?.length == 0 &&
            //   SearchData?.category == false) ||
            SearchData == null ? 10 : 0,
          borderBottomRightRadius:
            // (
            //   SearchData?.keywords?.length == 0 &&
            //   SearchData?.category == false) ||
            SearchData == null ? 10 : 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderColor: Color?.grey,
          gap: 10,
        }}>
        <View style={{paddingLeft: 10}}>
          <AntDesign name="search1" size={24} color={Color?.primary} />
        </View>
        <TextInput
          ref={textInputRef}
          placeholder="Search Category / Product"
          autoFocus={true}
          onChangeText={text => {
            console.log(text);
            setTextdata(text);
            HandleSearch(text);
          }}
          value={textdata}
          style={{
            width: scr_width - 70,
            borderRadius: 10,
            padding: 10,
            color: Color.black,
            fontSize: 16,
            fontFamily: Manrope.SemiBold,
          }}
          placeholderTextColor={Color?.grey}
        />
      </View>
      {/* {SearchData?.keywords?.length !== 0 && SearchData?.category == false ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10,
          }}>
          {nodata === true ? (
            <Text
              style={{
                fontSize: 15,
                color: Color.black,
                textTransform: 'capitalize',
              }}>
              No Data
            </Text>
          ) : null}
        </View>
      ) : ( */}
      <ScrollView
        style={{
          flex: 1,
          // margin: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {SearchData == null ? null : (
          <View
            style={{
              marginBottom: 10,
              gap: 5,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: Color?.grey,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              paddingLeft: 5,
              paddingTop: 5,
              paddingBottom: 5,
            }}>
            {SearchData?.keywords?.length == 0 &&
            SearchData?.category == false ? (
              <View
                style={{
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 15, color: Color.black}}>No Data</Text>
              </View>
            ) : null}

            {SearchData?.category == false
              ? null
              : SearchData?.category?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{paddingTop: 5, paddingLeft: 5}}
                      onPress={() =>
                        navigation.navigate('SelectCategory', {
                          CategoryList: item,
                        })
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                          alignItems: 'center',
                          marginBottom:
                            index === SearchData?.keywords?.length - 1 ? 10 : 0,
                        }}>
                        <Image
                          source={{uri: item?.image}}
                          style={{
                            width: scr_width / 13,
                            height: scr_height / 30,
                            resizeMode: 'contain',
                            borderRadius: 5,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            color: Color.black,
                            // marginBottom:
                            //   index === SearchData?.category?.length - 1
                            //     ? 10
                            //     : 10,
                          }}>
                          {item?.name?.length > 35
                            ? `${item?.name.substring(0, 35)}...`
                            : item?.name}
                        </Text>
                      </View>

                      {index === SearchData?.category?.length - 1 &&
                      SearchData?.keywords?.length == 0 ? null : (
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            width: scr_width - 50,
                            marginTop: 10,
                          }}>
                          <View
                            style={{
                              height: 1,
                              width: '100%',
                              alignSelf: 'center',
                              backgroundColor: Color?.primary,
                            }}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}

            {SearchData?.keywords?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{paddingTop: 5, paddingLeft: 5}}
                  onPress={() => {
                    navigation.navigate('ProductListing', {
                      keywordsData: item,
                      keywords: true,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                      marginBottom:
                        index === SearchData?.keywords?.length - 1 ? 10 : 0,
                    }}>
                    <AntDesign name="search1" size={20} color={Color?.black} />
                    {/* <Image
                              source={{uri: item?.image}}
                              style={{
                                width: scr_width / 13,
                                height: scr_height / 30,
                                resizeMode: 'contain',
                                borderRadius: 5,
                              }}
                            /> */}
                    <Text
                      style={{
                        fontSize: 15,
                        color: Color.black,
                        // marginBottom:
                        //   index === SearchData?.keywords?.length - 1 ? 10 : 0,
                      }}>
                      {item?.name?.length > 35
                        ? `${item?.name.substring(0, 35)}...`
                        : item?.name}
                    </Text>
                  </View>

                  {index === SearchData?.keywords?.length - 1 ? null : (
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        width: scr_width - 50,
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          height: 1,
                          width: '100%',
                          alignSelf: 'center',
                          backgroundColor: Color?.primary,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
      {/* )} */}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
