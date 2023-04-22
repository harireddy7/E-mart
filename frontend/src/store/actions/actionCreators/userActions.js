import axiosInstance from '../../../axiosInstance';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_RESET,
	USER_SHIPPING_ADDRESS,
	USER_PAYMENT_METHOD,
	GET_USER_START,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
} from '../actionConstants/userConstants';

export const loginAction =
	({ email, password }) =>
	async (dispatch) => {
		try {
			dispatch({ type: GET_USER_START });

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axiosInstance.post(
				'/auth/login',
				{ email, password },
				config
			);

			localStorage.setItem('__JWT_TOKEN__', data.token);
			const { _id, name } = data;
			const item = { _id, name, email };
			localStorage.setItem('__LUSER__', JSON.stringify(item));
			dispatch({ type: GET_USER_SUCCESS, payload: data });
		} catch (error) {
			const { response, message } = error;
			console.log({ response, message });
			const { data = {} } = response || {};
			const payload = data.message ? data.message : message;

			dispatch({ type: GET_USER_FAIL, payload });
		}
	};

export const logoutAction = () => (dispatch) => {
	localStorage.removeItem('__JWT_TOKEN__');
	localStorage.removeItem('__LUSER__');
	dispatch({ type: USER_LOGOUT });
};

export const registerAction =
	({ name, email, password }) =>
	async (dispatch) => {
		try {
			dispatch({ type: GET_USER_START });
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axiosInstance.post(
				'/auth/register',
				{ name, email, password },
				config
			);
			localStorage.setItem('__JWT_TOKEN__', data.token);
			const { _id } = data;
			const item = { _id, name, email };
			localStorage.setItem('__LUSER__', JSON.stringify(item));
			dispatch({ type: GET_USER_SUCCESS, payload: data });
		} catch (error) {
			console.log(error);
			const { response, message } = error;
			const { data } = response;
			const payload = data.message ? data.message : message;

			dispatch({ type: GET_USER_FAIL, payload });
		}
	};

export const getUserDetails = (id) => async (dispatch) => {
	const _token = localStorage.getItem('__JWT_TOKEN__');

	try {
		dispatch({ type: GET_USER_START });
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.get('/users/profile', config);
		const { _id, name, email } = data;
		const item = { _id, name, email };
		localStorage.setItem('__LUSER__', JSON.stringify(item));
		dispatch({ type: GET_USER_SUCCESS, payload: data });
	} catch (error) {
		const { response, message } = error;
		const { data = {} } = response || {};
		const payload = data.message ? data.message : message;

		dispatch({ type: GET_USER_FAIL, payload });
	}
};

export const updateProfileAction = (userObj, api) => async (dispatch) => {
	const _token = localStorage.getItem('__JWT_TOKEN__');

	try {
		dispatch({ type: GET_USER_START });
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.put(api, { ...userObj }, config);

		const { _id, name, email } = data;
		const item = { _id, name, email };
		localStorage.setItem('__LUSER__', JSON.stringify(item));

		dispatch({ type: GET_USER_SUCCESS, payload: data });
	} catch (error) {
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: GET_USER_FAIL, payload });
	}
};

export const resetToDefaults = () => (dispatch) => {
	dispatch({ type: USER_UPDATE_RESET });
};

export const savePaymentMethod = (method) => (dispatch) => {
	dispatch({ type: USER_PAYMENT_METHOD, payload: method });

	localStorage.setItem('paymentMethod', JSON.stringify(method));
};

export const getShippingAddressAction = () => async (dispatch) => {
	const _token = localStorage.getItem('__JWT_TOKEN__');

	try {
		dispatch({ type: 'GET_ADDRESS_START' });
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.get('/users/shipping-address', config);

		// console.log(data);
		dispatch({ type: 'GET_ADDRESS_SUCCESS', payload: data.shippingAddress });
	} catch (error) {
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: 'GET_ADDRESS_FAIL', payload });
	}
}

export const saveShippingAddressAction = (shippingAddress, history) => async (dispatch) => {
	const _token = localStorage.getItem('__JWT_TOKEN__');

	try {
		dispatch({ type: 'GET_ADDRESS_START' });
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.post('/users/shipping-address', shippingAddress, config);

		const _addresses = data?.shippingAddress;

		const _address = _addresses.find(add => add.address === shippingAddress.address);

		dispatch({ type: 'GET_ADDRESS_SUCCESS', payload: data.shippingAddress });
		dispatch({
			type: 'SELECT_SHIPPING_ADDRESS',
			payload: _address._id
		});
		history.push('/order-summary');
	} catch (error) {
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: 'GET_ADDRESS_FAIL', payload });
	}
}

export const removeShippingAddressAction = (addressId) => async (dispatch) => {
	const _token = localStorage.getItem('__JWT_TOKEN__');

	try {
		dispatch({ type: 'GET_ADDRESS_START' });
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.delete(`/users/shipping-address/${addressId}`, config);

		dispatch({ type: 'GET_ADDRESS_SUCCESS', payload: data.shippingAddress });
	} catch (error) {
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: 'GET_ADDRESS_FAIL', payload });
	}
}