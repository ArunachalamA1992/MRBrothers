import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission({
    alert: true,
    sound: true,
    badge: true,
    provisional: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
};
export const getFCMToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('fcmToken', fcmToken);
    if (fcmToken == null) {
      try {
        const token = await messaging().getToken();
        if (token) {
          console.log('fcmToken2', token);
          await AsyncStorage.setItem('fcmToken', token);
        } else {
        }
      } catch (error) {
        console.log('Error fetching token :', error);
      }
    }
  } catch (error) {
    console.log('Catch in getFcmToken  : ', error);
  }
};

export const notificationListener = () => {
  try {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // if (remoteMessage.data.type) {
      //   navigation.navigate(remoteMessage.data.type);
      // }
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type);
          // if (remoteMessage.data.type) {
          //   navigation.navigate(remoteMessage.data.type);
          // }
        }
      });
  } catch (error) {
    console.log('error', error);
  }
};

export const notificationPermission = () =>
  new Promise(async (resolve, reject) => {
    // if (Platform.OS === 'ios') {
    //   try {
    //     const permissionStatus = await Geolocation.requestAuthorization(
    //       'whenInUse',
    //     );
    //     if (permissionStatus === 'granted') {
    //       return resolve('granted');
    //     }
    //     reject('POST_NOTIFICATIONS not granted');
    //   } catch (error) {
    //     return reject(error);
    //   }
    // }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('POST_NOTIFICATIONS Permission denied');
      })
      .catch(error => {
        console.log('Ask POST_NOTIFICATIONS permission error: ', error);
        return reject(error);
      });
  });
