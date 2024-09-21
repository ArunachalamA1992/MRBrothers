// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import moment from 'moment';

// const CountdownTimer = ({ expiryTime }) => {
//   const [timeLeft, setTimeLeft] = useState(getTimeDifference(expiryTime));

//   // Function to get the time difference between now and the expiry time
//   const getTimeDifference = (expiry) => {
//     const now = moment();
//     const duration = moment.duration(moment(expiry).diff(now));
//     return duration.asSeconds() > 0 ? duration : moment.duration(0);
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTimeLeft(prevTime => {
//         const newTimeLeft = getTimeDifference(expiryTime);
//         if (newTimeLeft.asSeconds() <= 0) {
//           clearInterval(intervalId);
//           return moment.duration(0, 'seconds');
//         }
//         return newTimeLeft;
//       });
//     }, 1000);

//     return () => clearInterval(intervalId); // Cleanup on component unmount
//   }, [expiryTime]);

//   // Format time to MM:SS
//   const formatTime = () => {
//     const minutes = timeLeft.minutes();
//     const seconds = timeLeft.seconds();
//     return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.timerText}>{formatTime()}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   timerText: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default CountdownTimer;
