import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './productReducers';
import cartReducer from './cartReducer';
import { loginReducer } from './loginReducer';
import { registerReducer } from './registerReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: loginReducer,
  userRegister: registerReducer
});

export default rootReducer;
