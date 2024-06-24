import express from 'express';
import {
	createRazorpayOrder,
	processPaymentWebhook,
	storePaymentInfo,
} from '../controllers/paymentController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const router = express.Router();

// store payment info to db
router.route('/').post(authorizeUser, storePaymentInfo);

// create order_id to proceed to payment
router.route('/order').post(authorizeUser, createRazorpayOrder);

router.post('/webhook', processPaymentWebhook);

export default router;
