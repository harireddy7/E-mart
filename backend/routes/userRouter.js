import express from 'express';
import {
	getUserProfileById,
	updatePassword,
	updateProfile,
	getUserCart,
	addToCart,
	removeFromCart,
	clearUserCart,
	getShippingAddress,
	saveShippingAddress,
	removeShippingAddress,
} from '../controllers/userController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const router = express.Router();

router.use(authorizeUser);

// Get/Update User Profile
router
	.route('/profile')
	.get(getUserProfileById)
	.put(updateProfile);

router.route('/profile/reset-password').put(updatePassword);

// CART	
router
	.route('/cart')
	.get(getUserCart)
	.post(addToCart)
	.delete(clearUserCart);
router.route('/cart/:id').delete(removeFromCart);

// ADDRESS
router.route('/shipping-address').get(getShippingAddress).post(saveShippingAddress)

router.route('/shipping-address/:id').delete(removeShippingAddress)

export default router;
