import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/middleware.js';

dotenv.config();

connectDB();

const app = express();

app.use('/api/products', productRoutes);

app.use(notFound);

// Express handles any route with four arguments as error handling middleware
app.use(errorHandler);

app.get('/', (_, res) => {
  res.send('Api is running..');
});

const { PORT = 5000, NODE_ENV } = process.env;
app.listen(PORT, console.log(`server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold));
