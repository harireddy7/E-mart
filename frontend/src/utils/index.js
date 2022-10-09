import axiosInstance from '../axiosInstance';

const getLoggedInUser = () => {
	const _token = localStorage.getItem('__JWT_TOKEN__');
	const _user = JSON.parse(localStorage.getItem('__LUSER__'));
	if (_token && _user) {
		return _user;
	}
	return null;
};

const getCartPrice = items => {
	const actualPrice = Number(items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed());
	return { actualPrice, formattedPrice: actualPrice.toLocaleString('en-IN') };
}

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

async function createOrderAndShowRazorpay(orderData, history) {
	const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

	if (!res) {
		alert('Razorpay SDK failed to load. Are you online?');
		return;
	}

	const _token = localStorage.getItem('__JWT_TOKEN__');
	const _user = getLoggedInUser();
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${_token}`,
		},
	};

	// creating a new order
	const response = await axiosInstance.post('/payment/order', orderData, config);

	if (!response) {
		alert('Server error. try again!');
		return;
	}

	// Getting the order details back
	const { amount, id: order_id, currency } = response.data;

	const options = {
		key: process.env.REACT_APP_RAZORPAY_KEY_ID,
		amount: amount.toString(),
		currency,
		name: 'Tech Prism',
		description: `Payment for ${_user.name}`,
		order_id: order_id,
		handler: async function (response) {
			const paymentInfo = {
				orderId: order_id,
				paymentId: response.razorpay_payment_id,
				paymentOrderId: response.razorpay_order_id,
				signature: response.razorpay_signature,
			};
			try {
				const orderItem = {
					...orderData,
					paymentInfo,
				}
				console.log(orderItem)
	
				const { data: userOrder } = await axiosInstance.post('/payment', orderItem, config);
	
				console.log('Payment successful');
				console.log(userOrder);
				history.push('/orders');
			} catch(err) {
				console.log(err);
				console.log('Payment call to server failed');
			}
		},
	};

	const paymentObject = new window.Razorpay(options);
	paymentObject.open();
}

export { getLoggedInUser, getCartPrice, createOrderAndShowRazorpay };
