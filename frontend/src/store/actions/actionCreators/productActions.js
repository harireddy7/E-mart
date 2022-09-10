
import axiosInstance from '../../../axiosInstance';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL
} from '../actionConstants/productConstants';

const makeApiCall = async ({ actions = [], apiSchema: { method, url }, config = {}, dispatch }) => {
  if (!method || !url) return;
  const [LOAD, SUCCES, FAIL] = actions;
  try {
    dispatch({ type: LOAD });
    const { data } = await axiosInstance({ method, url, ...config });
    dispatch({ type: SUCCES, payload: data });
  } catch (error) {
    const { response, message } = error;
    const { data } = response;
    const payload = data.message ? data.message : message;

    dispatch({ type: FAIL, payload });
  }
};

export const listProducts = () => async dispatch => {
  const actions = [PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL];
  const apiSchema = { method: 'GET', url: '/products' };

  await makeApiCall({ actions, apiSchema, dispatch });
};

export const getProductById = id => async dispatch => {
  const actions = [PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAIL];
  const apiSchema = { method: 'GET', url: `/products/${id}` };

  await makeApiCall({ actions, apiSchema, dispatch });
};
