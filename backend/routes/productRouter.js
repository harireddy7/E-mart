import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// GET Products
router.route('/').get(getProducts);

// GET Product by Id
router.route('/:id').get(getProductById);

export default router;
