import {api} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const api_name = 'api/';

const AccessToken = async () => {
  try {
    const ACCESS_TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
    const value = JSON.parse(ACCESS_TOKEN);
    console.log('access token', value);
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
  // GET CITY PLACE API
  City_List_Place: async id => {
    let url = `location/city/${id}`;
    return api.getMethod(url);
  },
  // GET STATE API
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
  new_mobilenumber_OTP_Verify: async (data, token) => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/user-verify-otp';
    return api.postMethod(url, data, token);
  },
  // New User Register API
  New_user_Register: async (data, token) => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/register';
    console.log('=============>', token);

    return api.postMethod(url, data, token);
  },
  // Single User Get API
  Single_User_Get: async () => {
    let url = `user/get`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // User Login API
  User_Login: async data => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/login';
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  // User Login OTP_Verify API
  User_Login_OTP_Verify: async (data, accessToken) => {
    console.log(accessToken, '0000');
    console.log('Enter the new fun', data);
    let url = 'auth/user/verify';
    // const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  // Category List API
  Category_List: async page => {
    let url = `category?page=${page}&limit=10`;
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
  Add_To_Cart: async (data, id) => {
    let url = `cart/${id}`;
    const accessToken = await AccessToken();
    return api.putMethod(url, data, accessToken);
  },
  // NEW Cart Product Add API
  New_Add_To_Cart: async data => {
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
  Product_List: async id => {
    // let url = `product`;
    console.log('xddsddsdss', id);

    let url = `product?sub_category=${id}`;
    // console.log('sample',sample);
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // Filter API in Product listing :
  Filter_Product_List: async (gender, Weight, Purity, id) => {
    let url = `product${gender ? `?gender=${gender}` : ''}${
      Weight ? `${gender ? '&' : '?'}weight_variants=${Weight}` : ''
    }${
      Purity ? `${gender || Weight ? '&' : '?'}purity_variants=${Purity}` : ''
    }${id ? `&sub_category=${id}` : ''}`;
    console.log('Checking', url);
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // // Get All Product List using filter data :
  // Product_ListFilter: async (id, Purity, gender, Weight) => {
  //   let url = `product${gender ? `?gender=${gender}` : ''}${
  //     Weight ? `${gender ? '&' : '?'}weight_variants=${Weight}` : ''
  //   }${
  //     Purity ? `${gender || Weight ? '&' : '?'}purity_variants=${Purity}` : ''
  //   }${id ? `&sub_category=${id}` : ''}`;
  //   console.log('Checkinggggggggggg', url);
  //   const accessToken = await AccessToken();
  //   // return api.getMethod(url, accessToken);
  // },
  // Get All Product List using keyword
  Product_Listkeywords: async id => {
    let url = `product?keywords=${id}`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // Get All Product List
  GetAllProductlist: async id => {
    let url = `product?category=${id}`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET My Orders API
  MyOrders: async id => {
    let url = `order?status=${id}`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // NOTIFICATION API
  Notification: async page => {
    let url = `notification?page=${page}&limit=10`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // NOTIFICATION MARK AS READ API
  MarkAsRead: async data => {
    let url = `notification`;
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  // NOTIFICATION MARK ALL AS READ API
  MarkAllAsRead: async () => {
    let url = `notification`;
    const accessToken = await AccessToken();
    return api.putMethodNotification(url, accessToken);
  },
  // Notification Count API
  NotificationCount: async () => {
    let url = 'notification/count';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // Order API
  Post_Order: async data => {
    let url = `order`;
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  // Get_Banner_Section
  Get_Banner: async () => {
    let url = 'banner';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET Order Details :
  Get_Order_Details: async id => {
    let url = `order/${id}`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET Search Data in Order :
  Get_Order_Search_Data: async (text, status) => {
    let url = `order?like=${text}&status=${status}`;
    // let url = 'order?like=34&status=placed';
    // console.log(url33, 'url33');
    // console.log(url, 'url33');
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET Search Data :
  Get_Search_Data: async text => {
    let url = `keyword?like=${text}`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET SUB CATEGORIES API FUNCTION :
  Get_SubCategories: async id => {
    let url = `sub-category?category=${id}`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // LOGOUT API
  Logout: async () => {
    let url = 'auth/user/logout';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET QR CODE API
  Get_QR_Code: async () => {
    let url = 'qrcode?status=1';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
};
