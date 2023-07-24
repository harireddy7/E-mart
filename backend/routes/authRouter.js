import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *      - auth
 *     summary: Register new user
 *     description: Register new user and save user object to db
 *     operationId: registerUser
 *     requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      $ref: '#/components/schemas/RegisterUser' 
 *     responses:
 *      201:
 *          description: User registered successfully
 *          content:
 *            'application/json':
 *              schema:
 *                $ref: '#/components/schemas/RegisterUserSuccess'
 *      400:
 *          description: Bad request or User already exists
 *          content:
 *            'application/json':
 *              schema:
 *                $ref: '#/components/schemas/ErrorMsgStack'
 *      500:
 *          description: Internal Server Error
 *          content:
 *            'application/json':
 *              schema:
 *                $ref: '#/components/schemas/ErrorMsgStack'
 *       
 */
router.route('/register').post(registerUser);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *      - auth
 *     summary: Authenticate user
 *     description: Logs user into the app and get access token back
 *     operationId: loginUser
 *     requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUser' 
 *     responses:
 *      200:
 *          description: Authentication success
 *          content:
 *            'application/json':
 *              schema:
 *                $ref: '#/components/schemas/RegisterUserSuccess'
 *      400:
 *          description: Bad request
 *          content:
 *            'application/json':
 *              schema:
 *                $ref: '#/components/schemas/LoginUser400'
 *      401:
 *          description: Invalid email or password
 *          content:
 *            'application/json':
 *              schema:
 *                $ref: '#/components/schemas/LoginUser401'
 *      500:
 *          description: Internal Server Error
 *          content:
 *            'application/json':
 *              schema:
 *                $ref: '#/components/schemas/ErrorMsgStack'
 *       
 */
router.post('/login', loginUser);

export default router;
