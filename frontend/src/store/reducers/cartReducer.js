import { ADD_ITEM_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/actionConstants/cartConstants';

const initCart = {
  cartItems: []
};

const cartReducer = (state = initCart, { type, payload }) => {
  switch (type) {
    case ADD_ITEM_TO_CART: {
      const existedProduct = state.cartItems.find(item => item.id === payload.id);

      if (existedProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map(p => (p.id === payload.id ? payload : p))
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload]
        };
      }
    }
    case REMOVE_FROM_CART: {
      const cartProducts = state.cartItems.filter(p => p.id !== payload);
      return {
        ...state,
        cartItems: cartProducts
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        cartItems: []
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
