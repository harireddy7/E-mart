
import axiosInstance from '../../../axiosInstance';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_START,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from '../actionConstants/productConstants';

const makeApiCall = async ({ actions = [], apiSchema: { method, url }, config = {}, dispatch }) => {
  if (!method || !url) return;
  const [START, SUCCES, FAIL] = actions;
  try {
    dispatch({ type: START });
  
    const { data } = await axiosInstance({ method, url, ...config });
    dispatch({ type: SUCCES, payload: data });
  } catch (error) {
    const { response, message } = error;
    const { data } = response;
    const payload = data.message ? data.message : message;

    dispatch({ type: FAIL, payload });
  }
};

export const getProducts = () => async dispatch => {
  const actions = [GET_PRODUCTS_START, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL];
  const apiSchema = { method: 'GET', url: '/products' };

  await makeApiCall({ actions, apiSchema, dispatch });
};

export const getProductById = id => async dispatch => {
  const actions = [GET_PRODUCT_START, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL];
  const apiSchema = { method: 'GET', url: `/products/${id}` };

  await makeApiCall({ actions, apiSchema, dispatch });
};
