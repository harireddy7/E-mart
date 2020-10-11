import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL
} from '../actions/actionConstants/productConstants';

const initProductList = {
  products: []
};

const initProduct = {
  product: {
    reviews: []
  }
};

const productListReducer = (state = initProductList, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

const productDetailsReducer = (state = initProduct, { type, payload }) => {
  switch (type) {
    case PRODUCT_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer };
