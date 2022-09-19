import express from 'express';
import {
	getUserProfileById,
	updatePassword,
	updateProfile,
	getUserCart,
	addToCart,
	removeFromCart,
} from '../controllers/userController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const router = express.Router();

// Get/Update User Profile
router
	.route('/profile')
	.get(authorizeUser, getUserProfileById)
	.put(authorizeUser, updateProfile);

router.route('/profile/reset-password').put(authorizeUser, updatePassword);

router
	.route('/cart')
	.get(authorizeUser, getUserCart)
	.post(authorizeUser, addToCart);
router.route('/cart/:id').delete(authorizeUser, removeFromCart);

export default router;
