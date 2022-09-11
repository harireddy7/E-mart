const initialState = {
	isLoading: false,
	actionMessage: null,
	data: [],
	activeProduct: null,
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_PRODUCTS_START':
			return { ...state, isLoading: true };
		case 'GET_PRODUCTS_FAIL': {
			return {
				...state,
				isLoading: false,
				actionMessage: {
					type: 'error',
					message: action.payload,
				},
			};
		}
		case 'GET_PRODUCTS_SUCCESS': {
			return {
				...state,
				isLoading: false,
				actionMessage: null,
				data: action.payload,
			};
		}
		case 'GET_PRODUCT_START': {
			return { ...state, isLoading: true };
		}
		case 'GET_PRODUCT_FAIL': {
			return {
				...state,
				isLoading: false,
				actionMessage: {
					type: 'error',
					message: action.payload,
				},
			};
		}
		case 'GET_PRODUCT_SUCCESS': {
			return {
				...state,
				isLoading: false,
				actionMessage: null,
				activeProduct: action.payload,
			};
		}
		default:
			return state;
	}
};

export default productReducer;
