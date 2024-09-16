import {api} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const api_name = 'api/';

const AccessToken = async () => {
  try {
    const value = await AsyncStorage.getItem('ACCESS_TOKEN');
    console.log(value, '??');

    if (value !== null) {
      return value;
    }
  } catch (e) {
    return e;
  }
};

export default {

  // GET CITY API 
  City_List: async () => {
    let url = 'location/city';
    return api.getMethod(url);
  },
  City_List_Place: async (id) => {
    let url = `location/city/${id}`;
    return api.getMethod(url);
  },
  State_List: async () => {
    let url = 'location/state';
    return api.getMethod(url);
  },

  // New Mobile_Number Sent OTP API
  new_mobilenumber: data => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/verify-user';
    return api.postMethod(url, data);
  },
  // New Mobile_Number OTP_Verify
  new_mobilenumber_OTP_Verify: async data => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/user-verify-otp';
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  // New User Register API
  New_user_Register: async data => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/register';
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  // User Login API
  User_Login: async data => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/login';
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  // User Login OTP_Verify API
  User_Login_OTP_Verify: async data => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/verify';
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },

  // Category List API
  Category_List: async () => {
    let url = 'category';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET Cart API
  Cart_List: async () => {
    let url = 'cart';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },

  // GET Product Details API
  Product_Details: async id => {
    let url = `product/${id}`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // Cart Product Add API
  Add_To_Cart: async (data,id) => {
    let url = `cart/${id}`;
    const accessToken = await AccessToken();
    return api.putMethod(url, data, accessToken);
  },
  // NEW Cart Product Add API
  New_Add_To_Cart: async (data) => {
    let url = `cart`;
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  // DELETE Cart API
  Delete_Cart: async id => {
    let url = `cart/${id}`;
    const accessToken = await AccessToken();
    return api.deleteMethod(url, accessToken);
  },
  // Product List API
  Product_List: async (id,category) => {
    let url = `product?gender=${category}&category=${id}`;
    // let url = `product?category=${id}`;
    // console.log('sample',sample);
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET My Orders API
  MyOrders: async () => {
    let url = 'order';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // NOTIFICATION API
  Notification: async () => {
    let url = 'notification';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // NOTIFICATION MARK AS READ API
  MarkAsRead: async data => {
    let url = `notification`;
    const accessToken = await AccessToken();
    return api.postMethod(url,data, accessToken);
  }
};
