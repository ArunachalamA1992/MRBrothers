import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
export const handleNotification = data => {
  console.log(data, '------------------------------> Notification 5');
  PushNotification.localNotification({
    channelId: 'MRBrothers',
    title: data?.title,
    message: data?.body,
    smallIcon: data?.smallIcon,
    actions: data?.clickAction,
    showWhen: true,
    autoCancel: true,
    subText: data?.subText,
    bigPictureUrl: data?.android?.imageUrl,
    bigLargeIconUrl: data?.largeIconUrl,
    largeIconUrl: data?.android?.imageUrl,
    color: data?.color,
    vibrate: true,
    vibration: 300,
    tag: data?.tag,
    picture: data?.bigPictureUrl,
    playSound: true,
  });
};

export const createChannel = () => {
  PushNotification.createChannel({
    channelId: 'MRBrothers',
    channelName: 'MRBrothers',
  });
};
