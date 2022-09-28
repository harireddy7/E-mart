import axiosInstance from '../axiosInstance';

const getLoggedInUser = () => {
	const _token = localStorage.getItem('__JWT_TOKEN__');
	const _user = JSON.parse(localStorage.getItem('__LUSER__'));
	if (_token && _user) {
		return _user;
	}
	return null;
};

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script');
		script.src = src;
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
}

async function createOrderAndShowRazorpay(orderData) {
	const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

	if (!res) {
		alert('Razorpay SDK failed to load. Are you online?');
		return;
	}

	const _token = localStorage.getItem('__JWT_TOKEN__');
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${_token}`,
		},
	};

	// creating a new order
	const response = await axiosInstance.post('/payment/order', orderData, config);

	if (!response) {
		alert('Server error. Are you online?');
		return;
	}

	// Getting the order details back
	const { amount, id: order_id, currency } = response.data;

	const options = {
		key: process.env.REACT_APP_RAZORPAY_KEY_ID,
		amount: amount.toString(),
		currency: currency,
		name: 'Tech Prism',
		description: 'checking out from cart',
		order_id: order_id,
		handler: async function (response) {
			const data = {
				orderCreationId: order_id,
				razorpayPaymentId: response.razorpay_payment_id,
				razorpayOrderId: response.razorpay_order_id,
				razorpaySignature: response.razorpay_signature,
			};

			console.log(data);

			// const result = await axios.post(
			// 	'http://localhost:5000/payment/success',
			// 	data
			// );

			// alert(result.data.msg);
			console.log('Payment successful');
		},
	};

	const paymentObject = new window.Razorpay(options);
	paymentObject.open();
}

export { getLoggedInUser, createOrderAndShowRazorpay };
