import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './productReducers';
import cartReducer from './cartReducer';
import {
  loginReducer,
  registerReducer,
  userDetailsReducer,
  updateProfileReducer,
  userShippingAddressReducer,
  userPaymentMethodReducer
} from './userReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  userDetails: userDetailsReducer,
  updateProfile: updateProfileReducer,
  userShippingAddress: userShippingAddressReducer,
  userPaymentMethod: userPaymentMethodReducer
});

export default rootReducer;
