import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Iconviewcomponent} from '../../../Components/Icontag';
import Color from '../../../Global/Color';
import {Manrope} from '../../../Global/FontFamily';
import fetchData from '../../../Config/fetchData';

const Notification_Screen = ({route, navigation}) => {
  const [notification, setNotification] = useState([]);
  const GetNotification = async () => {
    const Notification = await fetchData?.Notification();
    if (Notification?.success == true) {
      console.log(Notification, 'Notification');
      setNotification(Notification?.data);
    } else {
      setNotification([]);
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
    console.log(item?.data, 'item');

    try {
      const Data = {
        id: [item?._id],
      };
      const MARK_AS_READ = await fetchData?.MarkAsRead(Data);
      if (MARK_AS_READ?.success == true) {
        GetNotification();
        navigation.navigate('OrderSummary', {
          OrderData: item?.data,
        });
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
        GetNotification();
      } else {
        console.log(MARK_AS_READ, 'MARK_AS_READ');
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', padding: 15}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', gap: 20}}
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
      <ScrollView
        style={{flex: 1, padding: 10, gap: 10}}
        showsVerticalScrollIndicator={false}>
        {notification?.map(item => {
          return (
            <TouchableOpacity
              style={{
                borderColor: item?.read_at ? Color?.grey : Color?.primary,
                borderWidth: 1,
                borderRadius: 10,
                gap: 10,
                paddingLeft: 10,
                paddingTop: 5,
                marginBottom: 10,
              }}
              onPress={() => MarkasRead(item)}>
              <View style={{alignItems: 'flex-start', gap: 5}}>
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
              <View style={{alignItems: 'flex-end', padding: 5}}>
                <Text>{formatTimeAgo(item.createdAt)}</Text>
                {/* <Text>mmm</Text> */}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Notification_Screen;

const styles = StyleSheet.create({});
