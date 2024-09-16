import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Iconviewcomponent } from '../../../Components/Icontag';
import Color from '../../../Global/Color';
import { Manrope } from '../../../Global/FontFamily';
import fetchData from '../../../Config/fetchData';

const Notification_Screen = ({ route, navigation }) => {
  // const NotificationScreen = [
  //   {
  //     id: 1,
  //     title: 'Notification',
  //     message: 'Notification Message',
  //     createdAt: '2024-09-09T06:15:45.485Z',
  //   },
  //   {
  //     id: 2,
  //     title: 'Notification',
  //     message: 'Notification Message',
  //     createdAt: '2024-09-09T06:15:45.485Z',
  //   },
  //   {
  //     id: 3,
  //     title: 'Notification',
  //     message: 'Notification Message',
  //     createdAt: '2024-09-09T06:15:45.485Z',
  //   },
  //   {
  //     id: 4,
  //     title: 'Notification',
  //     message: 'Notification Message',
  //     createdAt: '2024-09-09T06:15:45.485Z',
  //   },
  //   {
  //     id: 5,
  //     title: 'Notification',
  //     message: 'Notification Message',
  //     createdAt: '2024-09-09T06:15:45.485Z',
  //   },
  // ];
  const [notification, setNotification] = useState([]);
  const GetNotification = async () => {
    const Notification = await fetchData?.Notification();
    if (Notification?.success == true) {
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
  const MarkasRead = async item => {
    try {
      const Data = {
        id: [item?._id],
      };
      const MARK_AS_READ = await fetchData?.MarkAsRead(Data);
      if (MARK_AS_READ?.success == true) {
        GetNotification();
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.softGrey }}>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
      <ScrollView style={{ flex: 1, marginVertical: 10 }} showsVerticalScrollIndicator={false}>
        {notification?.map(item => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: Color.white,
                // borderColor: Color?.primary,
                // borderWidth: 1,
                // borderRadius: 10, 
                margin: 0, padding: 5, paddingHorizontal: 10, paddingVertical: 10, marginVertical: 5
                // gap: 10,
                // paddingLeft: 10,
                // paddingTop: 5,
                // marginBottom: 10,
              }}
              onPress={() => MarkasRead(item)}>
              <View style={{ alignItems: 'flex-start', }}>
                <Text style={{ fontSize: 15, color: Color?.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingTop: 5, textTransform: 'capitalize' }}>{item.msg_type}</Text>
                <Text style={{ fontSize: 13, fontFamily: Manrope.Medium, letterSpacing: 0.5, lineHeight: 22, textTransform: 'capitalize', color: Color?.cloudyGrey }}>{item.content}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', padding: 5 }}>
                <Text style={{ fontSize: 12, fontFamily: Manrope.Medium, letterSpacing: 0.5, lineHeight: 22, textTransform: 'capitalize', color: Color?.cloudyGrey }}>{formatTimeAgo(item.createdAt)}</Text>
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
