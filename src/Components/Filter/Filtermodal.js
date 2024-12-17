import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Iconviewcomponent} from '../Icontag';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {scr_width} from '../../Utils/Dimensions';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import fetchData from '../../Config/fetchData';

const Filtermodal = props => {
  const {setFilterVisible, filterVisible, navigation, setCategoryData, id} =
    props;
  console.log('wwwwwwwwww', id);

  const {width} = Dimensions.get('window');
  const [sidebar, setSidebar] = useState([
    {
      index: 0,
      data: 'gender',
      sublist: [
        {
          index: 0,
          data: 'men',
        },
        {
          index: 1,
          data: 'women',
        },
        {
          index: 2,
          data: 'couples',
        },
        {
          index: 3,
          data: 'kids',
        },
      ],
    },
    {
      index: 1,
      data: 'Size',
      sizesubslist: [
        {
          index: 0,
          data: '1',
        },
        {
          index: 1,
          data: '2',
        },
        {
          index: 2,
          data: '3',
        },
        {
          index: 3,
          data: '4',
        },
        {
          index: 4,
          data: '5',
        },
        {
          index: 5,
          data: '6',
        },
        {
          index: 6,
          data: '7',
        },
        {
          index: 7,
          data: '8',
        },
        {
          index: 8,
          data: '9',
        },
        {
          index: 9,
          data: '10',
        },
        {
          index: 10,
          data: '11',
        },
        {
          index: 11,
          data: '12',
        },
        {
          index: 12,
          data: '13',
        },
        {
          index: 13,
          data: '14',
        },
        {
          index: 14,
          data: '15',
        },
        {
          index: 15,
          data: '16',
        },
        {
          index: 16,
          data: '17',
        },
        {
          index: 17,
          data: '18',
        },
        {
          index: 18,
          data: '19',
        },
        {
          index: 19,
          data: '20',
        },
        {
          index: 20,
          data: '21',
        },
        {
          index: 21,
          data: '22',
        },
        {
          index: 22,
          data: '23',
        },
        {
          index: 23,
          data: '24',
        },
        {
          index: 24,
          data: '25',
        },
        {
          index: 25,
          data: 'Free Size',
        },
      ],
    },
    {
      index: 2,
      data: 'Weight',
    },
    {
      index: 2,
      data: 'Purity',
      puritySublist: [
        {
          index: 0,
          data: '18 KT',
        },
        {
          index: 1,
          data: '22 KT',
        },
      ],
    },
  ]);
  useEffect(() => {
    setselecteditem(sidebar[0]);
  }, []);
  const [selecteditem, setselecteditem] = useState(null);
  const [formattedData, setFormattedData] = useState({});
  const [selectedoption, setselectedoption] = useState([
    {
      index: 0,
      value: 'gender',
      data: [],
    },
    {
      index: 1,
      value: 'Size',
      data: [],
    },
    {
      index: 2,
      value: 'Weight',
      data: [1, 100],
    },
    {
      index: 3,
      value: 'Purity',
      data: [],
    },
  ]);
  const ClearData = () => {
    setselectedoption([
      {
        index: 0,
        value: 'gender',
        data: [],
      },
      {
        index: 1,
        value: 'Size',
        data: [],
      },
      {
        index: 2,
        value: 'Weight',
        data: [1, 100],
      },
      {
        index: 3,
        value: 'Purity',
        data: [],
      },
    ]);
    // setFilterVisible(false);
  };
  const handleSelect = itemm => {
    const value = selectedoption[0];
    const Check = value?.data?.findIndex(subItem => subItem === itemm);
    console.log('Check', Check);
    if (Check == -1) {
      value?.data?.push(itemm);
      console.log('value22222', value?.data);
      setselectedoption(prevOptions => {
        return prevOptions.map(option => {
          if (option.value === 'gender') {
            return {
              ...option,
              data: value?.data,
            };
          }
          return option;
        });
      });
    } else if (Check != -1) {
      value?.data?.splice(Check, 1);
      console.log('value333333', value?.data);
      setselectedoption(prevOptions => {
        return prevOptions.map(option => {
          if (option.value === 'gender') {
            return {
              ...option,
              data: value?.data,
            };
          }
          return option;
        });
      });
    } else {
      console.log('kcndkjcnkjdcn');
    }
  };
  const handlePuritySelect = itemm => {
    const value = selectedoption[3];
    const Check = value?.data?.findIndex(subItem => subItem === itemm);
    if (Check == -1) {
      value?.data?.push(itemm);
      setselectedoption(prevOptions => {
        return prevOptions.map(option => {
          if (option.value === 'Purity') {
            return {
              ...option,
              data: value?.data,
            };
          }
          return option;
        });
      });
    } else if (Check != -1) {
      value?.data?.splice(Check, 1);
      setselectedoption(prevOptions => {
        return prevOptions.map(option => {
          if (option.value === 'Purity') {
            return {
              ...option,
              data: value?.data,
            };
          }
          return option;
        });
      });
    } else {
      console.log('kcndkjcnkjdcn');
    }
  };
  const handleSizeSelect = itemm => {
    const value = selectedoption[1];
    const Check = value?.data?.findIndex(subItem => subItem === itemm);
    if (Check == -1) {
      value?.data?.push(itemm);
      setselectedoption(prevOptions => {
        return prevOptions.map(option => {
          if (option.value === 'Size') {
            return {
              ...option,
              data: value?.data,
            };
          }
          return option;
        });
      });
    } else if (Check != -1) {
      value?.data?.splice(Check, 1);
      setselectedoption(prevOptions => {
        return prevOptions.map(option => {
          if (option.value === 'Size') {
            return {
              ...option,
              data: value?.data,
            };
          }
          return option;
        });
      });
    } else {
      console.log('kcndkjcnkjdcn');
    }
  };
  const Getfilterdata = async () => {
    try {
      selectedoption?.forEach(item => {
        if (item?.value === 'Weight') {
          formattedData[item?.value] = item?.data.join(',');
        } else if (Array.isArray(item?.data)) {
          formattedData[item?.value] = item?.data
            .map(subItem => subItem?.data)
            .join(',');
        }
      });
      console.log('final', formattedData?.Weight);
      const Filterproduct = await fetchData?.Filter_Product_List(
        formattedData?.gender,
        formattedData?.Weight == '1,100' ? null : formattedData?.Weight,
        formattedData?.Purity,
        id,
      );
      console.log('CCChekingggggg', Filterproduct);

      if (Filterproduct?.success == true) {
        setCategoryData(Filterproduct?.data);
        setFilterVisible(false);
        // console.log('Success the Api', Filterproduct?.data);
      } else {
        console.log('Failllllll the Api', Filterproduct);
        if (Filterproduct?.message == 'No Data found for this request') {
          setCategoryData([]);
          setFilterVisible(false);
        }
      }
    } catch (error) {
      console.log('error in get filter data', error);
    }
  };
  return (
    <Modal visible={filterVisible} transparent animationType="slide">
      <View style={{flex: 1, backgroundColor: Color?.white}}>
        {/* Filter <---> header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 20,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 10}}
            onPress={() => setFilterVisible(false)}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'left'}
              icon_size={25}
              icon_color={Color.black}
            />
            <Text
              style={{
                color: Color.black,
                fontSize: 18,
                fontFamily: Manrope.SemiBold,
              }}>
              Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ClearData()}>
            <Text
              style={{
                color: Color?.primary,
                fontSize: 16,
                textTransform: 'uppercase',
              }}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter <---> body */}
        <View
          style={{
            backgroundColor: '#D9D9D9',
            flex: 1,
            width: scr_width,
            flexDirection: 'row',
          }}>
          <ScrollView style={{backgroundColor: Color?.white, width: '30%'}}>
            <View>
              <FlatList
                data={sidebar}
                keyExtractor={(item, index) => item + index}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  console.log('DDDDDDDDDDDDDDDD', item);

                  const selected = selecteditem?.data === item.data;
                  return (
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        borderleftWidth: selected ? 2 : 0,
                        borderColor: Color?.primary,
                        backgroundColor: 'white',
                      }}
                      onPress={() => {
                        setselecteditem(item);
                      }}>
                      <Text
                        style={{
                          color: selected ? Color?.primary : Color?.black,
                          fontSize: 16,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                        }}>
                        {item.data}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: Color?.white,
              width: '70%',
              marginLeft: 2,
            }}>
            <View style={{padding: 20}}>
              {selecteditem?.sublist?.map((item, index) => {
                const selected = selectedoption[0]?.data?.includes(item);
                console.log('selected', selected);
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      handleSelect(item);
                    }}>
                    <Iconviewcomponent
                      Icontag={'Fontisto'}
                      iconname={
                        selected ? 'checkbox-active' : 'checkbox-passive'
                      }
                      icon_size={20}
                      icon_color={selected ? Color?.primary : Color.black}
                    />
                    <View
                      style={{
                        padding: 10,
                        borderleftWidth: selected ? 2 : 0,
                        borderColor: Color?.primary,
                        backgroundColor: 'white',
                      }}
                      onPress={() => {
                        //   setselecteditem(item);
                      }}>
                      <Text
                        style={{
                          color: selected ? Color?.primary : Color?.black,
                          fontSize: 16,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                        }}>
                        {item.data}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              {selecteditem?.puritySublist?.map((item, index) => {
                const selected = selectedoption[3]?.data?.includes(item);
                console.log('selectedpurity', selected);
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      handlePuritySelect(item);
                    }}>
                    <Iconviewcomponent
                      Icontag={'Fontisto'}
                      iconname={
                        selected ? 'checkbox-active' : 'checkbox-passive'
                      }
                      icon_size={20}
                      icon_color={selected ? Color?.primary : Color.black}
                    />
                    <View
                      style={{
                        padding: 10,
                        borderleftWidth: selected ? 2 : 0,
                        borderColor: Color?.primary,
                        backgroundColor: 'white',
                      }}
                      onPress={() => {}}>
                      <Text
                        style={{
                          color: selected ? Color?.primary : Color?.black,
                          fontSize: 16,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'uppercase',
                        }}>
                        {item.data}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              {selecteditem?.sizesubslist?.map((item, index) => {
                const selected = selectedoption[1]?.data?.includes(item);
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      handleSizeSelect(item);
                    }}>
                    <Iconviewcomponent
                      Icontag={'Fontisto'}
                      iconname={
                        selected ? 'checkbox-active' : 'checkbox-passive'
                      }
                      icon_size={20}
                      icon_color={selected ? Color?.primary : Color.black}
                    />
                    <View
                      style={{
                        padding: 10,
                        borderleftWidth: selected ? 2 : 0,
                        borderColor: Color?.primary,
                        backgroundColor: 'white',
                      }}
                      onPress={() => {
                        //   setselecteditem(item);
                      }}>
                      <Text
                        style={{
                          color: selected ? Color?.primary : Color?.black,
                          fontSize: 16,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                        }}>
                        {item.data}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              {selecteditem?.data == 'Weight' && (
                <MultiSlider
                  values={selectedoption[2]?.data}
                  onValuesChange={e => {
                    console.log('weight', e);

                    setselectedoption(prevOptions => {
                      return prevOptions.map(option => {
                        if (option.value === 'Weight') {
                          return {
                            ...option,
                            data: e,
                          };
                        }
                        return option;
                      });
                    });
                  }}
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
                  sliderLength={width / 2}
                />
              )}
            </View>
          </ScrollView>
        </View>

        {/* Filter <---> footer */}
        <View
          style={{
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: Color?.primary,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            onPress={() => setFilterVisible(false)}>
            <Text style={{color: Color?.primary, fontSize: 16}}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Color?.primary,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            onPress={() => {
              Getfilterdata();
            }}>
            <Text style={{color: Color?.white, fontSize: 16}}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Filtermodal;

const styles = StyleSheet.create({});
