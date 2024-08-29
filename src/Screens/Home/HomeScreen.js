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
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Badge } from 'react-native-paper';
import { Manrope } from '../../Global/FontFamily';

import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Media } from '../../Global/Media';

LogBox.ignoreAllLogs();
const { width } = Dimensions.get('window');
// create a component
const HomeScreen = () => {

    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);

    const [categoryData, setCategoryData] = useState([
        {
            id: '0',
            cat_name: 'Rings',
            cat_image: require('../../assets/Images/ring.png'),
        },
        {
            id: '1',
            cat_name: 'Necklaces',
            cat_image: require('../../assets/Images/neck.png'),
        },
        {
            id: '2',
            cat_name: 'Bangles',
            cat_image: require('../../assets/Images/bangle.png'),
        },
        {
            id: '3',
            cat_name: 'Bracelets',
            cat_image: require('../../assets/Images/bracelet.png'),
        },
        {
            id: '4',
            cat_name: 'Earrings',
            cat_image: require('../../assets/Images/earing.png')
        },
        {
            id: '5',
            cat_name: 'Chains',
            cat_image: require('../../assets/Images/chain.png'),
        },
        {
            id: '6',
            cat_name: 'Pendants',
            cat_image: require('../../assets/Images/pen.png'),
        },
        // {
        //     id: '7',
        //     cat_name: 'Earrings',
        //     cat_image: require('../../assets/Images/earing.png')
        // },
    ]);

    const [shopSection] = useState([
        { id: 1, title: 'banners', data: ['banners'] },
        { id: 2, title: 'Category', data: ['Category'] },
        { id: 3, title: 'hot deals', data: ['hot deals'] },
        { id: 4, title: 'Trend Brands', data: ['Trend Brands'] },
        { id: 5, title: 'Trend Product', data: ['Trend Product'] },
        { id: 6, title: 'Offer Banner', data: ['Offer Banner'] },
        { id: 7, title: 'Flash Selling', data: ['Flash Selling'] },
        { id: 8, title: 'product', data: ['product'] },
        { id: 9, title: 'Latest Product', data: ['Latest Product'] },
        { id: 10, title: 'Featured Product', data: ['Featured Product'] },
    ]);

    const [bannerData, setBannerData] = useState([
        {
            id: '0',
            ban_name: 'Men',
            ban_image: require('../../assets/Banner/home_banner.jpg'),
            // ban_image: Media.banner_one,
        },
        {
            id: '1',
            ban_name: 'Women',
            ban_image: require('../../assets/Banner/home_banner.jpg'),
            // ban_image: Media.banner_two,
        },
        {
            id: '2',
            ban_name: 'Kid’s Wear',
            ban_image: require('../../assets/Banner/home_banner.jpg'),
            // ban_image: Media.banner_three,
        },
        {
            id: '3',
            ban_name: 'Men',
            ban_image: require('../../assets/Banner/home_banner.jpg'),
            // ban_image: Media.banner_four,
        },
        {
            id: '4',
            ban_name: 'Men',
            ban_image: require('../../assets/Banner/home_banner.jpg'),
            // ban_image: Media.banner_one,
        },
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.primary} barStyle={'light-content'} />

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

            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '95%', marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Image
                                source={require('../../assets/Images/dash.png')}
                                style={{ width: 120, height: 100, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate("MyCart")} style={{ paddingHorizontal: 10 }}>
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
                                    2
                                </Badge>
                                <Iconviewcomponent
                                    Icontag={'AntDesign'}
                                    iconname={'shoppingcart'}
                                    icon_size={24}
                                    icon_color={Color.black}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'FontAwesome'}
                                    iconname={'bell-o'}
                                    icon_size={24}
                                    icon_color={Color.black}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: 0, marginBottom: 20 }}>
                        <TouchableOpacity style={{ width: '95%', height: 55, flexDirection: 'row', alignItems: 'center', borderRadius: 30, paddingHorizontal: 20, borderColor: Color.cloudyGrey, borderWidth: 0.5 }}>
                            <Iconviewcomponent
                                Icontag={'Feather'}
                                iconname={'search'}
                                icon_size={24}
                                icon_color={Color.cloudyGrey}
                            />
                            <Text style={{ fontSize: 16, color: Color.Venus, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }}>Search Category / Product</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
                                            width: width, paddingVertical: 10,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
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
                                                marginTop: 30,
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
                                                            height: 160,
                                                            borderRadius: 5,
                                                            resizeMode: 'cover',
                                                            marginHorizontal: 5,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                );
                            case 'Category':
                                return (
                                    <View style={{ flex: 1, height: height, marginVertical: 20, alignItems: 'center', }}>
                                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Our Collections</Text>
                                                <Text style={{ fontSize: 12, color: Color.white, backgroundColor: Color.primary, marginHorizontal: 10, fontFamily: Manrope.Medium, paddingHorizontal: 15, padding: 5, borderRadius: 30 }}>New</Text>
                                            </View>
                                            {/* <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                                                <Text style={{ fontSize: 12, color: Color.lightBlack, textDecorationLine: 'underline' }}>See All</Text>
                                            </TouchableOpacity> */}
                                        </View>

                                        <View style={{ width: scr_width, height: 'auto', marginBottom: 90 }}>
                                            <FlatList
                                                data={categoryData}
                                                keyExtractor={(item, index) => item + index}
                                                numColumns={2}
                                                columnWrapperStyle={styles.row}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate("ProductDetails")}
                                                            style={{
                                                                width: 180,
                                                                height: 180,
                                                                margin: 5,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}>
                                                            <View style={{ borderRadius: 10, }}>
                                                                <Image
                                                                    source={item.cat_image}
                                                                    // source={require('../../assets/Images/ring.png')}
                                                                    style={{
                                                                        width: 170,
                                                                        height: 160,
                                                                        resizeMode: 'contain',
                                                                        borderRadius: 10,
                                                                    }}
                                                                />
                                                            </View>
                                                            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                        color: Color.black,
                                                                        font: Manrope.Bold,
                                                                        paddingVertical: 5,
                                                                    }}>
                                                                    {item?.cat_name}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    );
                                                }}
                                                style={{ margin: 5 }} />
                                        </View>
                                    </View>
                                );
                            // case 'Trend Brands':
                            //     return (
                            //         <Text>Test</Text>
                            //     );
                            // case 'Trend Product':
                            //     return (
                            //         <Text>Test</Text>
                            //     );
                        }
                    }}
                />
            </View>
        </SafeAreaView>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: scr_width, height: scr_height,
        backgroundColor: Color.white,
    },
    row: {
        flex: 1,
        justifyContent: "space-around"
    }
});

//make this component available to the app
export default HomeScreen;
