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
import Color from '../../Global/Color';
import { useNavigation } from '@react-navigation/native';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Manrope } from '../../Global/FontFamily';
import { Badge } from 'react-native-paper';
import { scr_width } from '../../Utils/Dimensions';
import SwiperFlatList from 'react-native-swiper-flatlist';


const { width } = Dimensions.get('window');

// create a component
const ProductDetails = () => {

    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);
    const [selectItem, setSelectItem] = useState('0')
    const [selectWeightItem, setSelectWeightItem] = useState('0')


    const [shopSection] = useState([
        { id: 1, title: 'banners', data: ['banners'] },
        { id: 2, title: 'Category', data: ['Category'] },
        { id: 3, title: 'Sizes', data: ['Sizes'] },
        { id: 4, title: 'Quality', data: ['Quality'] },
        { id: 5, title: 'Product', data: ['Product'] },
        { id: 6, title: 'Description', data: ['Description'] },
        { id: 7, title: 'Similar', data: ['Similar'] },
    ]);

    const [bannerData, setBannerData] = useState([
        {
            id: '0',
            ban_name: 'Men',
            ban_image: require('../../assets/Images/bangle.png'),
        },
        {
            id: '1',
            ban_name: 'Women',
            ban_image: require('../../assets/Images/ring.png'),
        },
        {
            id: '2',
            ban_name: 'Kid’s Wear',
            ban_image: require('../../assets/Images/chain.png'),
        },
        {
            id: '3',
            ban_name: 'Men',
            ban_image: require('../../assets/Images/ring.png'),
        },
        {
            id: '4',
            ban_name: 'Men1',
            ban_image: require('../../assets/Images/girl_earrings.png'),
        },
    ]);

    const [weightData, setWeightData] = useState([
        {
            id: '0',
            weight_name: '4.740 g',
        },
        {
            id: '1',
            weight_name: '5.244 g',
        },
    ]);
    const [variantData, setvariantData] = useState([
        {
            id: '0',
            var_name: '16.40 mm',
        },
        {
            id: '1',
            var_name: '18.40 mm',
        },
        {
            id: '2',
            var_name: '24.40 mm',
        },
    ]);

    const [similarData, setSimilarData] = useState([
        {
            id: '0',
            similar_name: 'Edelweiss Miracle Plate Diamond',
            similar_pro_Id: '#001',
            similar_image: require('../../assets/Images/ring_one.png'),
        },
        {
            id: '1',
            similar_name: 'Orchid Butterfly Diamond Ring',
            similar_pro_Id: '#002',
            similar_image: require('../../assets/Images/ring_two.png'),
        },
        {
            id: '2',
            similar_name: 'Yellow Gold Icy Summit Diamond Finger Ring',
            similar_pro_Id: '#003',
            similar_image: require('../../assets/Images/ring_one.png'),
        },
        {
            id: '3',
            similar_name: 'Edelweiss Miracle Plate Diamond',
            similar_pro_Id: '#004',
            similar_image: require('../../assets/Images/ring_one.png'),
        },
        {
            id: '4',
            similar_name: 'Orchid Butterfly Diamond Ring',
            similar_pro_Id: '#005',
            similar_image: require('../../assets/Images/ring_one.png'),
        },

    ]);

    const selectedItem = (item) => {
        try {
            setSelectItem(item.id)
        } catch (error) {
            console.log('catch in product_details selected_Item : ', error);

        }
    }

    const selectedWeightItem = (item) => {
        try {
            setSelectWeightItem(item.id)
        } catch (error) {
            console.log('catch in product_details selected_Item : ', error);

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                hidden={false}
                backgroundColor={Color.primary}
                translucent={false}
                barStyle="light-content"
                networkActivityIndicatorVisible={true}
            />
            {netInfo_State ? null : (
                <Animated.View
                    animation="fadeInRight"
                    style={{
                        flex: 1,
                        position: 'absolute',
                        zIndex: 9999,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#626262',
                        opacity: 0.5,
                        padding: 10,
                        marginTop: Platform.OS == 'ios' ? 80 : 0,
                    }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            )}
            <View style={{ flex: 1, }}>
                <View style={{ width: '100%', height: 60, elevation: 1, backgroundColor: Color.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'arrowleft'}
                                icon_size={24}
                                icon_color={Color.black}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold }}>Product Details</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }}>
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
                                2
                            </Badge>
                            <Iconviewcomponent
                                Icontag={'Feather'}
                                iconname={'shopping-cart'}
                                icon_size={22}
                                icon_color={Color.black}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            width: '100%',
                            backgroundColor: Color.white,
                            padding: 10,
                        }}>
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
                                            <View
                                                style={{
                                                    width: width,
                                                    alignItems: 'center',
                                                }}>
                                                <View
                                                    style={{
                                                        width: width,
                                                        alignItems: 'center',
                                                    }}>
                                                    <SwiperFlatList
                                                        autoplay
                                                        autoplayDelay={5}
                                                        autoplayLoop
                                                        index={1}
                                                        showPagination
                                                        data={bannerData}
                                                        paginationActiveColor={Color.primary}
                                                        paginationStyleItem={{
                                                            width: 15,
                                                            height: 3,
                                                            marginTop: 0,
                                                            marginHorizontal: 2,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                        renderItem={({ item }) => (
                                                            <TouchableOpacity>
                                                                <Image
                                                                    source={item.ban_image}
                                                                    style={{
                                                                        width: width - 10,
                                                                        height: 240,
                                                                        borderRadius: 5,
                                                                        resizeMode: 'cover',
                                                                        marginHorizontal: 5,
                                                                    }}
                                                                />
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                                </View>
                                                <View style={{ width: '95%', marginVertical: 10 }}>
                                                    <FlatList
                                                        data={bannerData}
                                                        horizontal
                                                        showsHorizontalScrollIndicator={false}
                                                        renderItem={({ item, index }) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    key={index}
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        margin: 10,
                                                                    }}>
                                                                    <Image
                                                                        source={item.ban_image}
                                                                        style={{
                                                                            width: 70,
                                                                            height: 70,
                                                                            resizeMode: 'contain',
                                                                        }}
                                                                    />
                                                                </TouchableOpacity>
                                                            );
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        );
                                    case 'Category':
                                        return (
                                            <View style={{ width: '95%', marginVertical: 10, alignItems: 'center', }}>
                                                <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                                                    <View style={{ width: 20, height: 20, backgroundColor: '#F2D292', borderRadius: 30 }}></View>
                                                    <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Manrope.Medium, paddingHorizontal: 5, letterSpacing: 0.5 }}>22 KT Gold</Text>
                                                </View>
                                                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, marginVertical: 15 }}>
                                                    <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                        <Text style={{ width: '100%', fontSize: 16, color: Color.black, textAlign: 'justify', fontFamily: Manrope.Bold, paddingHorizontal: 5, letterSpacing: 0.5 }} numberOfLines={2}>Yellow Gold Icy Summit Diamond Finger Ring </Text>
                                                        <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Medium, paddingHorizontal: 5, letterSpacing: 0.5, paddingVertical: 5 }} numberOfLines={1}>Product ID -
                                                            <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Manrope.SemiBold, paddingHorizontal: 5, letterSpacing: 0.5 }}> #0124563</Text>
                                                        </Text>
                                                    </View>
                                                    {/* <TouchableOpacity style={{ flex: 0.2, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                        <Iconviewcomponent
                                                            Icontag={'AntDesign'}
                                                            iconname={'sharealt'}
                                                            icon_size={24}
                                                            icon_color={Color.black}
                                                        />
                                                    </TouchableOpacity> */}
                                                </View>

                                            </View>
                                        );
                                    case 'Sizes':
                                        return (
                                            <View style={{ width: '95%', alignItems: 'center', }}>
                                                <View style={{ width: '95%', marginVertical: 10 }}>
                                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                                        <Text style={{ fontSize: 16, color: Color.black, paddingHorizontal: 10, textAlign: 'justify', fontFamily: Manrope.Bold, letterSpacing: 0.5 }} numberOfLines={1}>Select Size (in MM)</Text>
                                                        <Text style={{ fontSize: 14, color: Color.red, textDecorationLine: 'underline', textAlign: 'justify', fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }} numberOfLines={1}>Ring Size Guide</Text>
                                                    </View>
                                                    <View style={{ width: '100%', marginVertical: 10 }}>
                                                        <FlatList
                                                            data={variantData}
                                                            horizontal
                                                            showsHorizontalScrollIndicator={false}
                                                            renderItem={({ item, index }) => {
                                                                var selectItemBg = selectItem === item.id ? Color.gold : Color.white;
                                                                return (
                                                                    <TouchableOpacity onPress={() => { selectedItem(item) }}
                                                                        key={index}
                                                                        style={{ flexDirection: 'row', alignItems: 'center', margin: 5, backgroundColor: selectItemBg, padding: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: Color.gold, borderRadius: 30 }}>
                                                                        <Text style={{ fontSize: 14, color: selectItem === item.id ? Color.white : Color.black, fontFamily: Manrope.SemiBold }}>{item.var_name}</Text>
                                                                    </TouchableOpacity>
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ width: '95%' }}>
                                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                                        <Text style={{ fontSize: 16, color: Color.black, paddingHorizontal: 10, textAlign: 'justify', fontFamily: Manrope.Bold, letterSpacing: 0.5 }} numberOfLines={1}>Weight (in Gms)</Text>
                                                    </View>
                                                    <View style={{ width: '95%', marginVertical: 10 }}>
                                                        <FlatList
                                                            data={weightData}
                                                            horizontal
                                                            showsHorizontalScrollIndicator={false}
                                                            renderItem={({ item, index }) => {
                                                                var selectItemBg = selectWeightItem === item.id ? Color.gold : Color.white;
                                                                return (
                                                                    <TouchableOpacity onPress={() => { selectedWeightItem(item) }}
                                                                        key={index}
                                                                        style={{ flexDirection: 'row', alignItems: 'center', margin: 5, backgroundColor: selectItemBg, padding: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: Color.gold, borderRadius: 30 }}>
                                                                        <Text style={{ fontSize: 14, color: selectWeightItem === item.id ? Color.white : Color.black, fontFamily: Manrope.SemiBold }}>{item.weight_name}</Text>
                                                                    </TouchableOpacity>
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    case 'Quality':
                                        return (
                                            <View style={{ width: '100%', height: height, marginVertical: 15 }}>
                                                <View style={{ width: '95%', height: height, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                    <View>
                                                        <Text style={{ paddingHorizontal: 20, fontSize: 16, color: Color.black, textAlign: 'justify', fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Quantity</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <TouchableOpacity style={{ padding: 10, paddingHorizontal: 10, backgroundColor: Color.transparantBlack, borderRadius: 5 }}>
                                                            <Iconviewcomponent
                                                                Icontag={'Entypo'}
                                                                iconname={'minus'}
                                                                icon_size={24}
                                                                icon_color={Color.black}
                                                            />
                                                        </TouchableOpacity>
                                                        <View style={{ padding: 10, paddingHorizontal: 10, }}>
                                                            <Text style={{ paddingHorizontal: 5, fontSize: 16, color: Color.black, textAlign: 'justify', fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>0</Text>
                                                        </View>
                                                        <TouchableOpacity style={{ padding: 10, paddingHorizontal: 10, backgroundColor: Color.primary, borderRadius: 5 }}>
                                                            <Iconviewcomponent
                                                                Icontag={'Entypo'}
                                                                iconname={'plus'}
                                                                icon_size={24}
                                                                icon_color={Color.white}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    case 'Product':
                                        return (
                                            <View style={{ width: '95%', height: height, alignItems: 'center' }}>
                                                <View style={{ width: '100%', height: 1, marginVertical: 10, paddingVertical: 5, backgroundColor: '#F5F5F5' }}></View>
                                                <Text style={{ width: '95%', paddingHorizontal: 10, paddingTop: 10, fontSize: 16, color: Color.black, textAlign: 'justify', fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Product Description</Text>
                                                <View style={{ width: '95%', alignItems: 'center', paddingVertical: 10 }}>
                                                    <Text style={{ fontSize: 14, color: Color.cloudyGrey, textAlign: 'justify', fontFamily: Manrope.Medium, letterSpacing: 0.5, lineHeight: 22 }}>This stunning finger ring is crafted from 14 karat yellow gold and features a design inspired by the majestic beauty of mountains and their reflections.This stunning finger ring is crafted from 14 karat yellow gold and features a design inspired by the majestic beauty of mountains and their reflections.</Text>
                                                </View>
                                            </View>
                                        );
                                    case 'Description':
                                        return (
                                            <View style={{ width: '95%', height: height, alignItems: 'center' }}>
                                                <View style={{ width: '100%', height: 1, marginVertical: 10, paddingVertical: 5, backgroundColor: '#F5F5F5' }}></View>
                                                <Text style={{ width: '95%', paddingHorizontal: 10, paddingTop: 10, fontSize: 16, color: Color.black, textAlign: 'justify', fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Product Details</Text>
                                                <View style={{ width: '95%', marginTop: 10 }}>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Brand</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Varam</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Gender</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Women</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Metal</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Gold</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Purity</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>22kt</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Metal Color</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Yellow</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Gross Weight</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>5.2</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Net Weight</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>4.74</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Certification</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>916 BIS Hallmark</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Stone Weight</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>0.46</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ width: '100%', height: 1, marginVertical: 10, paddingVertical: 5, backgroundColor: '#F5F5F5' }}></View>
                                            </View>
                                        );
                                    case 'Similar':
                                        return (
                                            <View style={{ width: '95%', height: height, alignItems: 'center' }}>
                                                <Text style={{ width: '95%', paddingHorizontal: 10, paddingTop: 10, fontSize: 16, color: Color.black, textAlign: 'justify', fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Similar Products</Text>

                                                <View style={{ width: '95%', marginVertical: 10, marginBottom: 30 }}>
                                                    <FlatList
                                                        data={similarData}
                                                        horizontal
                                                        showsHorizontalScrollIndicator={false}
                                                        renderItem={({ item, index }) => {
                                                            console.log("lsdgjlsdjlgjsdlgj  ", item);

                                                            // var selectItemBg = selectWeightItem === item.id ? Color.gold : Color.white;
                                                            return (
                                                                <TouchableOpacity
                                                                    key={index}
                                                                    style={{ width: 170, height: 220, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: Color.white, borderWidth: 1, borderColor: Color.Venus, borderRadius: 5 }}>
                                                                    <View>
                                                                        <Image
                                                                            source={item.similar_image}
                                                                            style={{
                                                                                width: 140,
                                                                                height: 150,
                                                                                resizeMode: 'contain',
                                                                            }}
                                                                        />
                                                                    </View>
                                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Text style={{ fontSize: 15, textAlign: 'justify', color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }} numberOfLines={2}>{item.similar_name}</Text>
                                                                        <Text style={{ fontSize: 13, textAlign: 'justify', color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }} numberOfLines={1}>{item.similar_pro_Id}</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            );
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        );
                                }
                            }}
                        />
                    </View>
                </ScrollView>

                <View style={{ width: '100%', paddingVertical: 15, flexDirection: 'row', backgroundColor: '#CCCCCC', justifyContent: 'space-between', alignItems: 'center', bottom: 0, elevation: 2 }}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'shopping-cart'}
                            icon_size={22}
                            icon_color={Color.black}
                        />
                        <Text style={{ fontSize: 16, paddingHorizontal: 10, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Add to cart</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("MyCart")} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, padding: 13, paddingHorizontal: 20, borderRadius: 30 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'bag-handle-outline'}
                                icon_size={22}
                                icon_color={Color.white}
                            />
                            <Text style={{ fontSize: 16, paddingHorizontal: 10, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </SafeAreaView >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
});

//make this component available to the app
export default ProductDetails;
