//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { TouchableOpacity } from 'react-native';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

// create a component
const SelectCategory = ({route}) => {
    const CategoryDatas = route.params;
    console.log('====================================');
    console.log(CategoryDatas);
    console.log('====================================');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [netInfo_State, setNetinfo] = useState(true);

    const [CategoryData, setCategoryData] = useState([
        {
            'id': '0',
            'cat_image': require('../../assets/Images/ring.png'),
            'cat_name': 'Antique Ring',
            'cat_product': '20'
        },
        {
            'id': '1',
            'cat_image': require('../../assets/Images/bangle.png'),
            'cat_name': 'Band Rings',
            'cat_product': '15'
        },
        {
            'id': '2',
            'cat_image': require('../../assets/Images/chain.png'),
            'cat_name': 'Casual Rings',
            'cat_product': '5'
        },
        {
            'id': '3',
            'cat_image': require('../../assets/Images/earing.png'),
            'cat_name': 'Diamond rings',
            'cat_product': '10'
        },
        {
            'id': '4',
            'cat_image': require('../../assets/Images/ring.png'),
            'cat_name': 'Engagement rings',
            'cat_product': '55'
        },
        {
            'id': '5',
            'cat_image': require('../../assets/Images/ring.png'),
            'cat_name': 'Platinum rings for men',
            'cat_product': '30'
        },
        {
            'id': '6',
            'cat_image': require('../../assets/Images/ring.png'),
            'cat_name': 'Engagement rings',
            'cat_product': '55'
        },
        {
            'id': '7',
            'cat_image': require('../../assets/Images/ring.png'),
            'cat_name': 'Platinum rings for men',
            'cat_product': '30'
        },
        {
            'id': '8',
            'cat_image': require('../../assets/Images/ring.png'),
            'cat_name': 'Engagement rings',
            'cat_product': '55'
        },
        {
            'id': '9',
            'cat_image': require('../../assets/Images/ring.png'),
            'cat_name': 'Platinum rings for men',
            'cat_product': '30'
        },
    ])
    const [category_Data, setCategory_Data] = useState([]);
    //  GET CATEGORIES API FUNCTION :
    const GetSubCategories = async () => {
        
    }
    useEffect(() => {

    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '100%', backgroundColor: Color.softGrey, }}>
                        <FlatList
                            data={CategoryData}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate("ProductListing", { CategoryList: CategoryDatas?.CategoryList })}
                                        style={{
                                            width: '98%',
                                            flexDirection: 'row', justifyContent: 'space-between',
                                            alignItems: 'center', backgroundColor: Color.white, padding: 10, margin: 5, borderRadius: 5
                                        }}>
                                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                source={item?.cat_image}
                                                style={{
                                                    width: 80,
                                                    height: 80, padding: 5,
                                                    resizeMode: 'contain', backgroundColor: Color.softGrey
                                                }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                            <Text style={{ fontSize: 16, color: Color.black, font: Manrope.Bold, letterSpacing: 0.5 }}>
                                                {item?.cat_name}
                                            </Text>
                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, font: Manrope.Medium, paddingVertical: 5, letterSpacing: 0.5 }}>
                                                {item?.cat_product} products
                                            </Text>
                                        </View>
                                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                                            <Iconviewcomponent
                                                Icontag={'Ionicons'}
                                                iconname={'chevron-forward'}
                                                icon_size={20}
                                                icon_color={Color.cloudyGrey}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            style={{ margin: 5 }} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SelectCategory;