import express from 'express';
import { getUserProfileById, loginUser, registerUser } from '../controllers/userController.js';
import authorizeUser from '../middleware/authorizeUser.js';

const router = express.Router();

// Register User
router.route('/').post(registerUser);

// Login User
router.post('/login', loginUser);

// Get User Profile
router.route('/profile').get(authorizeUser, getUserProfileById);

export default router;
