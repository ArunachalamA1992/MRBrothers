//import liraries
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

// create a component
const ProfileView = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.UserReducer.userData);
    console.log("userData",userData);
    
    return (
        <View style={styles.container}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={{ width: scr_width, height: scr_height, alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/Logos/app_icon.png')}
                        style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 5 }}
                    />
                </View>
                <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Text style={{ paddingHorizontal: 10, fontSize: 18, color: Color.black, fontFamily: Manrope.SemiBold, }}>
                            Personal Details
                        </Text>
                        {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'MaterialIcons'}
                                iconname={'edit'}
                                icon_size={16}
                                icon_color={Color.primary}
                            />
                            <Text style={{ textAlign: 'left', fontSize: 14, color: Color.primary, fontFamily: Manrope.SemiBold, textDecorationLine: 'underline', marginLeft: 5, }}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity> */}
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, marginTop: 20 }}>
                        <Text style={{ textAlign: 'left', fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Bold, }}>
                            Name
                        </Text>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 16,
                                color: Color.black,
                                fontFamily: Manrope.Medium,
                                paddingVertical: 5,
                                textTransform: 'capitalize',
                            }}>
                           {userData?.name  ? userData?.name : 'Testing'}
                        </Text>
                    </View>
                    <View style={{ width: scr_width - 30, height: 1, backgroundColor: Color.Venus, marginVertical: 10 }}></View>

                    <View style={{ width: '100%', paddingHorizontal: 10, marginTop: 20 }}>
                        <Text style={{ textAlign: 'left', fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Bold, }}>
                            Email
                        </Text>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 16,
                                color: Color.black,
                                fontFamily: Manrope.Medium,
                                paddingVertical: 5,
                                // textTransform: 'capitalize',
                            }}>
                            {userData?.email  ? userData?.email : 'Testing@gmail.com'}
                        </Text>
                    </View>
                    <View style={{ width: scr_width - 30, height: 1, backgroundColor: Color.Venus, marginVertical: 10 }}></View>

                    <View style={{ width: '100%', paddingHorizontal: 10, marginTop: 20 }}>
                        <Text style={{ textAlign: 'left', fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Bold, }}>
                            Mobile Number
                        </Text>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 16,
                                color: Color.black,
                                fontFamily: Manrope.Medium,
                                paddingVertical: 5,
                                textTransform: 'capitalize',
                            }}>
                           {`+91 ${userData?.mobile  ? userData?.mobile : '1234567890'}`}
                        </Text>
                    </View>
                    <View style={{ width: scr_width - 30, height: 1, backgroundColor: Color.Venus, marginVertical: 10 }}></View>

                    <View style={{ width: '100%', paddingHorizontal: 10, marginTop: 20 }}>
                        <Text style={{ textAlign: 'left', fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Bold, }}>
                            Address
                        </Text>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 16,
                                color: Color.black,
                                fontFamily: Manrope.Medium,
                                paddingVertical: 5,
                                textTransform: 'capitalize',
                            }}>
                            {userData?.address_line ? `${userData?.address_line}` : '123 ABC Street'}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 16,
                                color: Color.black,
                                fontFamily: Manrope.Medium,
                                paddingVertical: 5,
                                textTransform: 'capitalize',
                            }}>
                            {userData?.city ? `${userData?.city}` : ' Tiruppur'}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 16,
                                color: Color.black,
                                fontFamily: Manrope.Medium,
                                paddingVertical: 5,
                                textTransform: 'capitalize',
                            }}>
                           {userData?.state && userData?.pincode ? `${userData?.state}  ${userData?.pincode}` : 'Tamilnadu 641604'}
                        </Text>
                    </View>
                    <View style={{ width: scr_width - 30, height: 1, backgroundColor: Color.Venus, marginVertical: 10 }}></View>
                </View>
            </View>
            {/* </ScrollView> */}
        </View>
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
export default ProfileView;
