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
    Modal,
    TextInput,
    Pressable,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Alert } from 'react-native';
import { LottieCheck } from '../../Components/Lottie';
import { useNavigation } from '@react-navigation/native';

// create a component
const MyCart = () => {
    const navigation = useNavigation();
    const [height, setHeight] = useState(undefined);
    const [shopSection] = useState([
        { id: 1, title: 'CartItem', data: ['CartItem'] },
        { id: 2, title: 'Category', data: ['Category'] },
    ]);

    const [orderData, setOrderData] = useState([
        {
            id: '0',
            order_name: 'Royal Gold Ring',
            order_product_Id: '#2222',
            order_status: 'In-Progressing',
            order_Id: '#0124',
            order_quantity: '25',
            order_image: require('../../assets/Images/girl_ring.png'),
        },
        {
            id: '1',
            order_name: 'Floral Gold Earrings',
            order_product_Id: '#0124',
            order_status: 'Order Placed',
            order_Id: '#0124',
            order_quantity: '5',
            order_image: require('../../assets/Images/girl_earrings.png'),
        },
        // {
        //     id: '2',
        //     order_name: 'Royal Gold Necles',
        //     order_product_Id: '#3456',
        //     order_status: 'Delivered',
        //     order_Id: '#0124',
        //     order_quantity: '15',
        //     order_image: require('../../assets/Images/bracelet.png'),
        // },
        // {
        //     id: '3',
        //     order_name: 'Floral Gold Earrings',
        //     order_product_Id: '#0124',
        //     order_status: 'Order Placed',
        //     order_Id: '#0124',
        //     order_quantity: '5',
        //     order_image: require('../../assets/Images/girl_earrings.png'),
        // },
        // {
        //     id: '4',
        //     order_name: 'Royal Gold Necles',
        //     order_product_Id: '#3456',
        //     order_status: 'Delivered',
        //     order_Id: '#0124',
        //     order_quantity: '15',
        //     order_image: require('../../assets/Images/bracelet.png'),
        // },
        // {
        //     id: '5',
        //     order_name: 'Floral Gold Earrings',
        //     order_product_Id: '#0124',
        //     order_status: 'Order Placed',
        //     order_Id: '#0124',
        //     order_quantity: '5',
        //     order_image: require('../../assets/Images/girl_earrings.png'),
        // },
        // {
        //     id: '6',
        //     order_name: 'Royal Gold Necles',
        //     order_product_Id: '#3456',
        //     order_status: 'Delivered',
        //     order_Id: '#0124',
        //     order_quantity: '15',
        //     order_image: require('../../assets/Images/bracelet.png'),
        // }
    ]);

    const [confirmModal, setConfirmModal] = useState(false);


    const removeItemClick = () => {
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
                            console.log('Ok Pressed');
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log('catch in change_Country : ', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.primary} barStyle={'light-content'} />
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
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
                                case 'CartItem':
                                    return (
                                        <View style={{ width: '100%', height: height, alignItems: 'center', marginBottom: 30 }}>
                                            <FlatList
                                                data={orderData}
                                                keyExtractor={(item, index) => item + index}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <View style={{ width: scr_width, margin: 5, elevation: 3, marginVertical: 10, paddingVertical: 10, backgroundColor: Color.white }}>
                                                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                <TouchableOpacity style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                                                                    <Image
                                                                        source={item.order_image}
                                                                        style={{ width: 130, height: 140, resizeMode: 'contain', borderRadius: 5 }}
                                                                    />
                                                                </TouchableOpacity>
                                                                <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                                                        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                                            <Text style={{ fontSize: 16, color: Color.black, font: Manrope.Bold, paddingVertical: 3 }} numberOfLines={2}>{item?.order_name}</Text>
                                                                            <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Medium, paddingVertical: 3 }} numberOfLines={1}>Product-ID:
                                                                                <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold }}>{item?.order_product_Id}</Text>
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 10 }}>
                                                                            <TouchableOpacity onPress={() => removeItemClick()}>
                                                                                <Iconviewcomponent
                                                                                    Icontag={'AntDesign'}
                                                                                    iconname={'delete'}
                                                                                    icon_size={24}
                                                                                    icon_color={Color.cloudyGrey}
                                                                                />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>

                                                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                            <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Size - </Text>
                                                                            <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold }}>16.4.mm</Text>
                                                                        </View>
                                                                        <View style={{ width: 1, height: '100%', backgroundColor: Color.cloudyGrey }}></View>
                                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                                            <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Weight - </Text>
                                                                            <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold }}>5.244 g</Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 10 }}>
                                                                        <TouchableOpacity
                                                                            style={{
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                padding: 10,
                                                                                paddingHorizontal: 10,
                                                                                backgroundColor: Color.lightgrey, borderRadius: 5,
                                                                                // borderRightWidth: 1,
                                                                                borderRightColor: Color.cloudyGrey,
                                                                            }}>
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
                                                                                0
                                                                            </Text>
                                                                        </View>
                                                                        <TouchableOpacity
                                                                            style={{
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                padding: 10,
                                                                                paddingHorizontal: 10,
                                                                                backgroundColor: Color.primary, borderRadius: 5,
                                                                                // borderLeftWidth: 1,
                                                                                borderLeftColor: Color.cloudyGrey,
                                                                            }}>
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
                                                style={{ width: '100%', }} />
                                        </View>
                                    );

                            }
                        }}
                    />
                </View>
                <View style={{ width: '100%', alignItems: 'center', bottom: 20 }}>
                    <TouchableOpacity onPress={() => setConfirmModal(true)} style={{ width: '95%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 5 }}>
                        <Text style={{ fontSize: 14, color: Color.white }}>Buy Now</Text>
                    </TouchableOpacity>
                </View>


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

                            <View style={{ width: '100%', height: '85%' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: '100%', height: '80%', alignItems: 'center' }}>
                                        <LottieCheck />
                                        <Text style={{ fontSize: 26, color: Color.black, fontFamily: Manrope.SemiBold, paddingVertical: 5 }}>Order Confirmed !</Text>
                                        <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, paddingVertical: 2 }}>We will send a confirmation email to</Text>
                                        <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, paddingVertical: 2 }}>info@mrbrothers.com</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', bottom: 10 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={{ width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 5 }}>
                                        <Text style={{ fontSize: 16, color: Color.white }}>View Order</Text>
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
