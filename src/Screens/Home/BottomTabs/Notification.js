import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View, Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Iconviewcomponent } from '../../../Components/Icontag';
import Color from '../../../Global/Color';
import { Manrope } from '../../../Global/FontFamily';
import fetchData from '../../../Config/fetchData';
import { useFocusEffect } from '@react-navigation/native';
import { scr_width } from '../../../Utils/Dimensions';

const Notification_Screen = ({ route, navigation }) => {
  const [notification, setNotification] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     setPage(1);
  //     GetNotification();
  //     return () => {};
  //   }, []),
  // );
  const GetNotification = async () => {
    const Notification = await fetchData?.Notification(page);
    if (Notification?.success == true) {
      console.log(Notification, 'Notification');
      setNotification(Notification?.data);
      console.log('<<========== Checking get ======>>');
      console.log(Notification?.data?.length, 'Notification?.data?.length');
    } else {
      console.log('333333333333333333333', page);

      console.log('Failed To Get Cart', Notification);
      // setNotification([]);
    }
  };
  const GetNotificationall = async () => {
    const Notification = await fetchData?.Notification(1);
    if (Notification?.success == true) {
      setNotification(Notification?.data);
      setPage(2);
    } else {
      // setNotification([]);
    }
  };
  useEffect(() => {
    GetNotification();
  }, []);
  function formatTimeAgo(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now - inputDate;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / (60000 * 60));
    const diffInDays = Math.floor(diffInMs / (60000 * 60 * 24));
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }
  // MarkasRead
  const MarkasRead = async item => {
    console.log('Notification Data', item);
    try {
      const Data = {
        id: [item?._id],
      };
      console.log('dddddd', Data);

      const MARK_AS_READ = await fetchData?.MarkAsRead(Data);
      if (MARK_AS_READ?.success == true) {
        await GetNotification();
        if (item?.msg_type !== 'user_approved') {
          navigation.navigate('OrderSummary', {
            OrderData: item?.data,
          });
        }
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  // Markallasread
  const Markallasread = async () => {
    try {
      const MARK_AS_READ = await fetchData?.MarkAllAsRead();
      if (MARK_AS_READ?.success == true) {
        GetNotificationall();
      } else {
        console.log(MARK_AS_READ, 'MARK_AS_READ');
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: '100%',
        borderColor: item?.read_at ? Color?.grey : Color?.primary,
        borderWidth: 1,
        borderRadius: 10,
        // gap: 10,
        backgroundColor: item?.read_at ? "#fff":'#0C52451A',
        justifyContent:'center',
        marginTop:10
        // paddingLeft: 10,
        // paddingTop: 5,
        // marginBottom: 10,
      }}
      onPress={() => MarkasRead(item)}>
      <View style={{ width:scr_width/1.17, flexDirection: 'row',gap:10,marginHorizontal:5,marginVertical:5}}>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/Logos/app_icon.png')}
            style={{ width: 80, height: 80, resizeMode: 'contain',borderRadius:10 }}
          />
        </View>
        <View>
        <View style={{width:scr_width/1.53 }}>
          <Text
            style={{
              fontSize: 16,
              color: item?.read_at ? Color?.grey : Color?.primary,
              fontFamily: Manrope.SemiBold,
              textTransform: 'capitalize',
            }}>
            {item.msg_type}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Medium,
              textTransform: 'capitalize',
              color: Color?.black,
            }}>
            {item.content}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end', padding: 5 }}>
        <Text>{formatTimeAgo(item.createdAt)}</Text>
      </View>
        </View>
        
      </View>
      
    </TouchableOpacity>
  );
  const fetchNotifications = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);

    // console.log('wwwwwwwwwwwww');
    try {
      const Notification = await fetchData?.Notification(page);
      console.log('SSSSSSSSSSS');
      console.log(Notification?.success, 'Notification');
      if (Notification?.success == true) {
        console.log(Notification, 'Notification');
        setNotification([...notification, ...Notification?.data]);
        // if (Notification?.data?.length == 10) {
        setPage(prevPage => prevPage + 1);
        setLoading(false);
        // }
      } else {
        console.log('333333333333333333333', page);

        // console.log('Failed To Get Cart', Notification);
        // setLoading(false);
        // setNotification([]);
      }
      // Increase the page for the next request
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}
          onPress={() => navigation.goBack()}>
          <Iconviewcomponent
            Icontag={'AntDesign'}
            iconname={'arrowleft'}
            icon_size={24}
            icon_color={Color.black}
          />
          <Text
            style={{
              fontSize: 20,
              color: Color.black,
              fontFamily: Manrope.SemiBold,
            }}>
            Notification
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Markallasread();
          }}>
          <Text
            style={{
              fontSize: 12,
              color: Color?.primary,
              fontFamily: Manrope.SemiBold,
              textTransform: 'capitalize',
            }}>
            Mark all as read
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notification}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNotifications}
        onEndReachedThreshold={0.5}
      // ListFooterComponent={
      //   loading && page !== 1 ? (
      //     <ActivityIndicator size="large" color={Color?.primary} />
      //   ) : null
      // }
      />
    </View>
  );
};

export default Notification_Screen;

const styles = StyleSheet.create({});
