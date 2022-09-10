import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_CLEAR,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from '../actions/actionConstants/orderConstants';

export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST: {
      return { loading: true };
    }
    case ORDER_CREATE_SUCCESS: {
      return { loading: false, success: true, order: payload };
    }
    case ORDER_CREATE_FAIL: {
      return { loading: false, error: payload };
    }
    case ORDER_CREATE_CLEAR: {
      return {};
    }
    case GET_ORDERS_REQUEST: {
      return { loading: true };
    }
    case GET_ORDERS_SUCCESS: {
      return { loading: false, success: true, orders: payload };
    }
    case GET_ORDERS_FAIL: {
      return { loading: false, error: payload };
    }
    default:
      return state;
  }
};

export const userOrdersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_ORDERS_REQUEST: {
      return { loading: true };
    }
    case GET_ORDERS_SUCCESS: {
      return { loading: false, success: true, orders: payload };
    }
    case GET_ORDERS_FAIL: {
      return { loading: false, error: payload };
    }
    default:
      return state;
  }
};
