import {
  SET_CART_COUNT,
  SET_USER_DATA,
  SET_CART,
  SET_AUTH,
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
export const setAuthfun = param => {
  return {
    type: SET_AUTH,
    payload: param,
  };
};
