import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - products
 *     summary: Get all products
 *     description: Returns all the products from db
 *     operationId: getProducts
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           'application/json':
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/ErrorMsgStack'
 */
router.route('/').get(getProducts);

/**
 * @openapi
 * /products/{productId}:
 *   get:
 *     tags:
 *       - products
 *     summary: Get product by id
 *     description: Return a single product info based on product id
 *     operationId: getProductById
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: Prodcut ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           'application/json':
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/ErrorMsgStack'
 */
router.route('/:productId').get(getProductById);

export default router;
