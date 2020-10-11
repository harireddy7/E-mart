import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './productReducers';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
});

export default rootReducer;
