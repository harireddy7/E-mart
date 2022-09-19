import axiosInstance from '../../../axiosInstance';
import {
	ADD_ITEM_TO_CART,
	REMOVE_FROM_CART,
	CLEAR_CART,
} from '../actionConstants/cartConstants';

export const getUserCartAction = () => async (dispatch) => {
	try {
		dispatch({
			type: 'GET_CART_START',
		});
		const _token = localStorage.getItem('__JWT_TOKEN__');
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.get('/users/cart', config);

		dispatch({ type: 'GET_CART_SUCCESS', payload: data?.cart });
	} catch (error) {
		console.log(error);
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: 'GET_CART_FAIL', payload });
	}
};

export const addToCart =
	({ id, quantity, history }) =>
	async (dispatch) => {
		try {
			dispatch({
				type: 'ADD_CART_START',
			});
			const _token = localStorage.getItem('__JWT_TOKEN__');
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${_token}`,
				},
			};
			const { data } = await axiosInstance.post(
				'/users/cart',
				{ id, quantity },
				config
			);

			dispatch({ type: 'ADD_CART_SUCCESS', payload: data?.cart });
		} catch (error) {
			console.log(error);
			const { response, message } = error;
			const { data } = response;
			const payload = data.message ? data.message : message;

			dispatch({ type: 'ADD_CART_FAIL', payload });
		}
	};

export const removeFromCart = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ADD_CART_START',
		});
		const _token = localStorage.getItem('__JWT_TOKEN__');
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.delete(`/users/cart/${id}`, config);

		dispatch({ type: 'ADD_CART_SUCCESS', payload: data?.cart });
	} catch (error) {
		console.log(error);
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: 'ADD_CART_FAIL', payload });
	}
};

export const clearCart = () => (dispatch) => {
	dispatch({
		type: CLEAR_CART,
	});

	localStorage.setItem('cartItems', JSON.stringify([]));
};
