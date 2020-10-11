import { ADD_ITEM_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actionConstants/cardConstants';

export const addToCart = ({ product, qty }) => (dispatch, getState) => {
  const { _id: id, name, image, countInStock, price } = product;
  const cartItem = { id, name, image, price, countInStock, qty };
  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: cartItem
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => dispatch => {
  dispatch({
    type: CLEAR_CART
  });

  localStorage.setItem('cartItems', JSON.stringify([]));
};
