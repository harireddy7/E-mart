import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_SHIPPING_ADDRESS,
  USER_PAYMENT_METHOD
} from '../actions/actionConstants/userConstants';

export const loginReducer = (state = { userInfo: null }, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registerReducer = (state = { userInfo: null }, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: null }, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: payload };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = { success: false, user: null }, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user: payload };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: payload, success: false };
    case USER_UPDATE_RESET:
      return { success: false, user: null };
    default:
      return state;
  }
};

export const userShippingAddressReducer = (state = { shippingAddress: null }, { type, payload }) => {
  switch (type) {
    case USER_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: payload };
    default:
      return state;
  }
};

export const userPaymentMethodReducer = (state = { paymentMethod: null }, { type, payload }) => {
  switch (type) {
    case USER_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload };
    default:
      return state;
  }
};
