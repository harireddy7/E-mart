import express from 'express';
import { getUserProfileById, updateProfile } from '../controllers/userController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const router = express.Router();

// Get User Profile
router.route('/profile').get(authorizeUser, getUserProfileById).put(authorizeUser, updateProfile);

export default router;
