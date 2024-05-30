import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import Order from '../models/order.js';

dotenv.config();

const razorpayOptions = {
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
};

const instance = new Razorpay(razorpayOptions);

export const createRazorpayOrder = asyncHandler(async (req, res) => {
	const { orderItems, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items found!');
		return;
	} else {
		const orderDetails = orderItems.map((item) => ({
			quantity: item.quantity,
			productId: item.product._id,
			price: item.product.price,
			userId: item.product.user,
		}));
		const orderOptions = {
			amount: totalPrice * 100,
			currency: 'INR',
			receipt: Date.now().toString(),
			notes: {
				orderItems: JSON.stringify(orderDetails),
				totalPrice,
				user: req.user._id.toString(),
			},
		};

		try {
			const order = await instance.orders.create(orderOptions);

			res.status(201).json(order);
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
