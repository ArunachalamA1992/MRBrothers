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
import { useNavigation } from '@react-navigation/native';
import { Manrope } from '../../../Global/FontFamily';
import { Iconviewcomponent } from '../../../Components/Icontag';

// create a component
const Profile = () => {

    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);

    return (
        <View style={styles.container}>
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
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingVertical: 30 }}>
                    <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'arrowleft'}
                            icon_size={28}
                            icon_color={Color.black}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: Color.lightBlack, fontFamily: Manrope.SemiBold }}>Profile</Text>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: Color.white }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Image
                                source={require('../../../assets/Logos/app_icon.png')}
                                style={{ width: 80, height: 80, resizeMode: 'contain' }}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }} numberOfLines={1}>Arunachalam Annamalai</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }} numberOfLines={1}>arunachalam@avanexa.com</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 3, backgroundColor: Color.lightgrey, marginVertical: 20 }}></View>

                    <TouchableOpacity onPress={() => navigation.navigate("ProfileView")} style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.softGrey, borderRadius: 30 }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'user'}
                                    icon_size={20}
                                    icon_color={Color.cloudyGrey}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>Your Profile</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward'}
                                icon_size={20}
                                icon_color={Color.cloudyGrey}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.Venus, marginVertical: 5 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate("MyOrder")} style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.softGrey, borderRadius: 30 }}>
                                <Iconviewcomponent
                                    Icontag={'AntDesign'}
                                    iconname={'shoppingcart'}
                                    icon_size={20}
                                    icon_color={Color.cloudyGrey}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>Orders</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward'}
                                icon_size={20}
                                icon_color={Color.cloudyGrey}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.Venus, marginVertical: 5 }}></View>
                    <TouchableOpacity style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.softGrey, borderRadius: 30 }}>
                                <Iconviewcomponent
                                    Icontag={'Fontisto'}
                                    iconname={'map-marker-alt'}
                                    icon_size={20}
                                    icon_color={Color.cloudyGrey}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>Shop Address</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward'}
                                icon_size={20}
                                icon_color={Color.cloudyGrey}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.Venus, marginVertical: 5 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")} style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.softGrey, borderRadius: 30 }}>
                                <Iconviewcomponent
                                    Icontag={'MaterialIcons'}
                                    iconname={'privacy-tip'}
                                    icon_size={20}
                                    icon_color={Color.cloudyGrey}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>Privacy Policy</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward'}
                                icon_size={20}
                                icon_color={Color.cloudyGrey}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.Venus, marginVertical: 5 }}></View>

                    <TouchableOpacity onPress={() => navigation.navigate("TermsandConditions")} style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.softGrey, borderRadius: 30 }}>
                                <Iconviewcomponent
                                    Icontag={'SimpleLineIcons'}
                                    iconname={'notebook'}
                                    icon_size={20}
                                    icon_color={Color.cloudyGrey}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>Terms & Conditions</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward'}
                                icon_size={20}
                                icon_color={Color.cloudyGrey}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.Venus, marginVertical: 5 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate("AboutUs")} style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.softGrey, borderRadius: 30 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={'information-circle'}
                                    icon_size={20}
                                    icon_color={Color.cloudyGrey}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>About Us</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward'}
                                icon_size={20}
                                icon_color={Color.cloudyGrey}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.Venus, marginVertical: 5 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate("ContactUs")} style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.softGrey, borderRadius: 30 }}>
                                <Iconviewcomponent
                                    Icontag={'AntDesign'}
                                    iconname={'contacts'}
                                    icon_size={20}
                                    icon_color={Color.cloudyGrey}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>Contact Us</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward'}
                                icon_size={20}
                                icon_color={Color.cloudyGrey}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.Venus, marginVertical: 5 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate("Auth")} style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.softGrey, borderRadius: 30 }}>
                                <Iconviewcomponent
                                    Icontag={'MaterialCommunityIcons'}
                                    iconname={'logout'}
                                    icon_size={20}
                                    icon_color={Color.cloudyGrey}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>Log Out</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward'}
                                icon_size={20}
                                icon_color={Color.cloudyGrey}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.Venus, marginVertical: 5 }}></View>
                </ScrollView>
            </View>
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
export default Profile;
