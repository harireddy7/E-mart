import axios from 'axios';
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
} from '../actionConstants/userConstants';

export const loginAction = ({ email, password }) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post('/api/users/login', { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const { response, message } = error;
    const { data } = response;
    const payload = data.message ? data.message : message;

    dispatch({ type: USER_LOGIN_FAIL, payload });
  }
};

export const logoutAction = () => dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const registerAction = ({ name, email, password }) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post('/api/users', { name, email, password }, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const { response, message } = error;
    const { data } = response;
    const payload = data.message ? data.message : message;

    dispatch({ type: USER_REGISTER_FAIL, payload });
  }
};

export const getUserDetails = id => async (dispatch, getState) => {
  const { userLogin: { userInfo = {} } = {} } = getState();

  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.get('/api/users/profile', config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const { response, message } = error;
    const { data } = response;
    const payload = data.message ? data.message : message;

    dispatch({ type: USER_DETAILS_FAIL, payload });
  }
};

export const updateProfileAction = userObj => async (dispatch, getState) => {
  const { userLogin: { userInfo = {} } = {} } = getState();

  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.put('/api/users/profile', { ...userObj }, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const { response, message } = error;
    const { data } = response;
    const payload = data.message ? data.message : message;

    dispatch({ type: USER_UPDATE_FAIL, payload });
  }
};

export const resetToDefaults = () => dispatch => {
  dispatch({ type: USER_UPDATE_RESET });
};

export const saveShippingAddress = address => dispatch => {
  dispatch({ type: USER_SHIPPING_ADDRESS, payload: address });

  localStorage.setItem('shippingAddress', JSON.stringify(address));
};

export const savePaymentMethod = method => dispatch => {
  dispatch({ type: USER_PAYMENT_METHOD, payload: method });

  localStorage.setItem('paymentMethod', JSON.stringify(method));
};
