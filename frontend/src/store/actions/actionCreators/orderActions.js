import axios from 'axios';
import { CLEAR_CART } from '../actionConstants/cartConstants';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_CLEAR
} from '../actionConstants/orderConstants';

export const orderCreateAction = orderObj => async (dispatch, getState) => {
  const { userLogin: { userInfo = {} } = {} } = getState();

  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.post('/api/orders/', { ...orderObj }, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

    // clearing cart post successful order creation
    dispatch({
      type: CLEAR_CART
    });

    localStorage.setItem('cartItems', JSON.stringify([]));
  } catch (error) {
    const { response, message } = error;
    const { data } = response;
    const payload = data.message ? data.message : message;

    dispatch({ type: ORDER_CREATE_FAIL, payload });
  }
};

export const clearOrderCreateAction = () => async dispatch => {
  dispatch({ type: ORDER_CREATE_CLEAR });
};
