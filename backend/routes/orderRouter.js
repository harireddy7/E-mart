import express from 'express';
import { createOrderItems, getOrderItems } from '../controllers/orderController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const router = express.Router();

// Create order items
router.route('/').post(authorizeUser, createOrderItems).get(authorizeUser, getOrderItems);

export default router;
