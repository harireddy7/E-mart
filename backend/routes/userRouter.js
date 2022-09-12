import express from 'express';
import { getUserProfileById, updatePassword, updateProfile } from '../controllers/userController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const router = express.Router();

// Get/Update User Profile
router.route('/profile').get(authorizeUser, getUserProfileById).put(authorizeUser, updateProfile);

router.route('/profile/reset-password').put(authorizeUser, updatePassword);

export default router;
