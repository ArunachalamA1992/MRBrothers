import {
  SET_CART_COUNT,
  SET_USER_DATA,
  SET_CART
} from './UserActionTypes';

export const setUserData = param => {
  return {
    type: SET_USER_DATA,
    payload: param,
  };
};
export const setcart = param => {
  return {
    type: SET_CART,
    payload: param,
  };
};
export const setCartCount = param => {
  return {
    type: SET_CART_COUNT,
    payload: param,
  };
};


