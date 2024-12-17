import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SET_AUTH,
  SET_CART,
  SET_CART_COUNT,
  SET_USER_DATA,
} from './UserActionTypes';

const initialState = {
  userData: null,
  Cart_Count:0,
  cart : null,
  is_Auth :false,
};

const storeUserData = async UserState => {
  try {
    const jsonValue = JSON.stringify(UserState);
    await AsyncStorage.setItem('User_Data', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      storeUserData({
        ...state,
        userData: action.payload,
      });
      return {
        ...state,
        userData: action.payload,
      };
    case SET_CART_COUNT:
      return {
        ...state,
        Cart_Count: action.payload,
      };
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
      case SET_AUTH:
      return {
        ...state,
        is_Auth: action.payload,
      };
    default:
      return state;
  }

  // switch (action.type) {
  //   case SET_USER_DATA:
  //     storeCartData({
  //       ...state,
  //       userData: action.payload,
  //     });
  //     return {
  //       ...state,
  //       userData: action.payload,
  //     };
  //   case SET_LOGIN_TYPE:
  //     storeCartData({
  //       ...state,
  //       Login_type: action.payload,
  //     });
  //     return {
  //       ...state,
  //       Login_type: action.payload,
  //     };
  //   case SET_AUCTION_USER_DATA:
  //     storeCartData({
  //       ...state,
  //       auctionUserData: action.payload,
  //     });
  //     return {
  //       ...state,
  //       auctionUserData: action.payload,
  //     };
  //   case SET_FILTER_LOCATION:
  //     // storeCartData({
  //     //   ...state,
  //     //   filterLocation: {
  //     //     city: action.payload.city,
  //     //     landmark: action.payload.landmark,
  //     //   },
  //     // });
  //     return {
  //       ...state,
  //       filterLocation: {
  //         city: action.payload.city,
  //         landmark: action.payload.landmark,
  //       },
  //     };
  //   case SET_AUTO_FILTER:
  //     storeCartData({
  //       ...state,
  //       AutoFilter: action.payload,
  //     });
  //     return {
  //       ...state,
  //       AutoFilter: action.payload,
  //     };
  //   case SET_FILTER_REMOVE_ITEM:
  //     var cart_item = Object.values(state.filterLocation).filter(
  //       single =>
  //         single.city !== action.payload.city ||
  //         single.landmark !== action.payload.landmark,
  //     );
  //     cart_item.map(item => {
  //       delete [item];
  //     });
  //     return {
  //       ...state,
  //       filterLocation: cart_item,
  //     };

  //   case SET_EDIT_VISIBLE:
  //     return {
  //       ...state,
  //       editUserVisible: action.payload,
  //     };
  //   case SET_ASYNC_CART:
  //     var {userData, auctionUserData, AutoFilter} = action.payload;
  //     return {
  //       ...state,
  //       userData,
  //       auctionUserData,
  //       AutoFilter,
  //     };
  //   default:
  //     return state;
  // }
};

export default UserReducer;
