import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

// Register User
router.route('/register').post(registerUser);

// Login User
router.post('/login', loginUser);

export default router;
