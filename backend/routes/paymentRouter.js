import express from 'express';
import { createRazorpayOrder } from '../controllers/paymentController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const router = express.Router();

// create order_id to proceed to payment
router.route('/order').post(authorizeUser, createRazorpayOrder);

export default router;
