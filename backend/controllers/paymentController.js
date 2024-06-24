import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import Order from '../models/order.js';

dotenv.config();

const razorpayOptions = {
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
};

const razorpay = new Razorpay(razorpayOptions);

export const createRazorpayOrder = asyncHandler(async (req, res) => {
	const { orderItems, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items found!');
		return;
	} else {
		const revisedOrderItems = orderItems.map((item) => ({
			productId: item.product._id,
			quantity: item.quantity,
			price: item.product.price,
			userId: item.product.user,
		}));

		const orderObj = {
			amount: totalPrice * 100,
			currency: 'INR',
		};

		const orderOptions = {
			...orderObj,
			receipt: Date.now().toString(),
			notes: {
				orderItems: JSON.stringify(revisedOrderItems),
				totalPrice,
				user: req.user._id.toString(),
			},
		};

		try {
			const order = await razorpay.orders.create(orderOptions);

			// Create payment link
			const paymentLinkOptions = {
				...orderObj,
				description: 'Payment for order #' + order.receipt,
				callback_url: 'http://locahost:3000/payment',
				callback_method: 'get',
			};
			const response = await razorpay.paymentLink.create(paymentLinkOptions);
			if (response && response.short_url) {
				return res.status(201).json({ order, paymentLink: response.short_url });
			}
			res.status(500);
			throw new Error('Error occured creating payment link');
			return;
		} catch (err) {
			console.log(err);
			if (err) return res.status(500).send(err.msg);
		}
	}
});

export const storePaymentInfo = asyncHandler(async (req, res) => {
	const user = req.user;
	const { orderItems, totalPrice, shippingAddress, paymentInfo } = req.body;
	const newOrderItem = {
		user: user._id,
		orderItems,
		totalPrice,
		shippingAddress,
		paymentInfo,
		isPaid: true,
		paidAt: Date.now(),
		isDelivered: false,
	};
	const savedOrder = await Order.create(newOrderItem);

	if (savedOrder) {
		res.status(201).json(savedOrder);
	} else {
		res.status(400);
		throw new Error('Payment not stored, invalid payment data!');
	}
});

export const processPaymentWebhook = asyncHandler(async (req, res) => {
	try {
		const { event, payload } = req.body || {};
		console.log(event, JSON.stringify(payload));

		if (event === 'payment.authorized') {
			return res.status(201).json({ message: 'payment.authorized noted' });
		} else if (event === 'payment.captured') {
			// return res.redirect('http://localhost:3000/payment?status=success');
			return res.status(307).redirect('https://upskill.onrender.com/signin?status=success');
		}
		return res.redirect('http://localhost:3000/payment?status=failed');
	} catch (err) {
		console.log(err);
		res.redirect('http://localhost:3000/payment?status=failed');
	}
});
