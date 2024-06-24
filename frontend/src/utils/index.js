import axiosInstance from '../axiosInstance';
import { clearCart } from '../store/actions/actionCreators/cartActions';

const getLoggedInUser = () => {
	const _token = localStorage.getItem('__JWT_TOKEN__');
	const _user = JSON.parse(localStorage.getItem('__LUSER__'));
	if (_token && _user) {
		return _user;
	}
	return null;
};

const getCartPrice = (items) => {
	const actualPrice = Number(
		items
			.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
			.toFixed(),
	);
	return { actualPrice, formattedPrice: actualPrice.toLocaleString('en-IN') };
};

async function createOrderAndShowRazorpay(orderData, dispatch, history) {
	const _token = localStorage.getItem('__JWT_TOKEN__');
	const _user = getLoggedInUser();
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${_token}`,
		},
	};

	// creating a new order
	const response = await axiosInstance.post(
		'/payment/order',
		orderData,
		config,
	);

	if (!response) {
		alert('Server error. try again!');
		return;
	}

	console.log(response);

	// Getting the payment url and order details back
	const { paymentLink } = response.data;

	window.location.href = paymentLink;
}

export { getLoggedInUser, getCartPrice, createOrderAndShowRazorpay };
