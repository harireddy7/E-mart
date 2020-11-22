import express from 'express';
import { createOrderItems } from '../controllers/orderController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const router = express.Router();

// Create order items
router.route('/').post(authorizeUser, createOrderItems);

export default router;
