import { GET_USER_FAIL, GET_USER_START, GET_USER_SUCCESS, USER_LOGOUT } from '../actions/actionConstants/userConstants';

const initialState = {
  isLoading: false,
  actionMessage: null,
  data: null,
  cart: [],
  orders: [],
  address: [],
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_START:
			return { ...state, isLoading: true };
		case GET_USER_FAIL: {
			return {
				...state,
				isLoading: false,
				actionMessage: {
					type: 'error',
					message: action.payload,
				},
			};
		}
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        actionMessage: null,
        data: action.payload,
      }
    }
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
	}
};

export default userReducer;
