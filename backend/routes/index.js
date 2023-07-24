import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import paymentRouter from './paymentRouter.js';
import orderRouter from './orderRouter.js';
import definition from '../swagger/definition.cjs';

const apiRouter = express.Router();

// Swagger setup
const swaggerJSDocOptions = swaggerJSDoc({
	definition,
	apis: ['backend/routes/*.js', 'backend/models/*.js'],
});

// SWAGGER DOCS
apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDocOptions));

// APP ROUTES
apiRouter.use('/auth', authRouter);
apiRouter.use('/users/', userRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/payment', paymentRouter);
apiRouter.use('/orders', orderRouter);

export default apiRouter;
