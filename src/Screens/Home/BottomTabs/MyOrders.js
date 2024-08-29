//import liraries
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
} from 'react-native';

import Color from '../../../Global/Color';
import { Iconviewcomponent } from '../../../Components/Icontag';
import { Manrope } from '../../../Global/FontFamily';
import { scr_height, scr_width } from '../../../Utils/Dimensions';
import SwiperFlatList from 'react-native-swiper-flatlist';

// create a component
const MyOrders = () => {

    const [height, setHeight] = useState(undefined);
    const [shopSection] = useState([
        { id: 1, title: 'banners', data: ['banners'] },
        { id: 2, title: 'Category', data: ['Category'] },
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
        }
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
        }
    ]);
    const [selectItem, setSelectItem] = useState('0')

    const selectedItem = (item) => {
        try {
            setSelectItem(item.id)
        } catch (error) {
            console.log('catch in selected_Item : ', error);

        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.primary} barStyle={'light-content'} />
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <View style={{ width: '90%', alignItems: 'center', marginTop: 10, marginHorizontal: 10 }}>
                    <TouchableOpacity style={{ width: '100%', height: 55, flexDirection: 'row', alignItems: 'center', borderRadius: 30, paddingHorizontal: 20, borderColor: Color.cloudyGrey, borderWidth: 0.5 }}>
                        <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'search'}
                            icon_size={24}
                            icon_color={Color.cloudyGrey}
                        />
                        <Text style={{ fontSize: 16, color: Color.Venus, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }}>Search in orders</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: scr_width, paddingVertical: 10 }}>
                    <FlatList
                        data={filterData}
                        keyExtractor={(item, index) => item + index}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            var selectItemBg = selectItem === item.id ? Color.primary : Color.white;
                            return (
                                <TouchableOpacity onPress={() => { selectedItem(item) }}
                                    style={{
                                        margin: 5,
                                        justifyContent: 'center', paddingHorizontal: 25, padding: 5, borderRadius: 30,
                                        alignItems: 'center', backgroundColor: selectItemBg
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
                        style={{ margin: 5 }} />
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
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
                                case 'banners':
                                    return (
                                        <View style={{ width: '100%', height: height, alignItems: 'center' }}>
                                            <FlatList
                                                data={orderData}
                                                keyExtractor={(item, index) => item + index}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <View style={{ width: '100%', margin: 5, elevation: 3, marginVertical: 10, backgroundColor: Color.white }}>
                                                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                <TouchableOpacity style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                                                    <Image
                                                                        source={item.order_image}
                                                                        // source={require('../../../assets/Images/earing.png')}
                                                                        style={{ width: 120, height: 130, resizeMode: 'contain', borderRadius: 5 }}
                                                                    />
                                                                </TouchableOpacity>
                                                                <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                                                    <Text style={{ fontSize: 16, color: Color.black, font: Manrope.Bold, paddingVertical: 3 }} numberOfLines={2}>{item?.order_name}</Text>
                                                                    <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Medium, paddingVertical: 3 }} numberOfLines={1}>Product-ID:
                                                                        <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold }}>{item?.order_product_Id}</Text>
                                                                    </Text>
                                                                    <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Medium, paddingVertical: 3 }} numberOfLines={1}>Quantity -
                                                                        <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold }}>{item?.order_quantity}</Text>
                                                                    </Text>
                                                                    <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, borderColor: Color.primary, borderWidth: 0.5, borderRadius: 30, paddingHorizontal: 20, paddingVertical: 5, marginVertical: 5 }} numberOfLines={1}>{item?.order_status}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 15 }}>
                                                                <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 20 }}>
                                                                    <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Order-ID</Text>
                                                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold }} numberOfLines={1}>{item.order_Id}</Text>
                                                                </View>
                                                                <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                                                                    <TouchableOpacity style={{ paddingHorizontal: 30, paddingVertical: 10, backgroundColor: Color.primary, borderRadius: 30 }}>
                                                                        <Text style={{ fontSize: 13, color: Color.white, fontFamily: Manrope.Medium }}>Download invoice</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    );
                                                }}
                                                style={{ width: '100%', }} />
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
