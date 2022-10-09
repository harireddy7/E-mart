import {
	GET_USER_FAIL,
	GET_USER_START,
	GET_USER_SUCCESS,
	USER_LOGOUT,
} from '../actions/actionConstants/userConstants';

const initialState = {
	isLoading: false,
	actionMessage: null,
	data: null,
	cart: null,
	orders: null,
	shippingAddress: null,
	selectedAddressId: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_START:
		case 'GET_CART_START':
		case 'ADD_CART_START':
		case 'GET_ADDRESS_START':
		case 'GET_ADDRESS_START': {
			return { ...state, isLoading: true };
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				isLoading: false,
				actionMessage: null,
				data: action.payload,
			};
		}
		case USER_LOGOUT:
			return initialState;
		case 'GET_CART_SUCCESS':
		case 'ADD_CART_SUCCESS': {
			return {
				...state,
				isLoading: false,
				actionMessage: null,
				cart: action.payload,
			};
		}
		case GET_USER_FAIL:
		case 'GET_CART_FAIL':
		case 'ADD_CART_FAIL':
		case 'GET_ADDRESS_FAIL':
		case 'GET_ORDERS_FAIL': {
			return {
				...state,
				isLoading: false,
				actionMessage: {
					type: 'error',
					message: action.payload,
				},
			};
		}
		case 'GET_ADDRESS_SUCCESS': {
			return {
				...state,
				isLoading: false,
				actionMessage: null,
				shippingAddress: action.payload
			}
		}
		case 'SELECT_SHIPPING_ADDRESS': {
			return {
				...state,
				selectedAddressId: action.payload,
			}
		}
		case 'GET_ORDERS_SUCCESS': {
			return {
				...state,
				orders: action.payload,
			}
		}
		default:
			return state;
	}
};

export default userReducer;
