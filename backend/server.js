import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'colors';

import connectDB from './config/db.js';
import apiRouter from './routes/index.js';

import { errorHandler, notFound } from './middleware/middleware.js';
import { API_VERSION } from './utils/constants.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// CORS
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

// API
app.use(API_VERSION, apiRouter)

// STATIC FILES
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (_, res) => {
    res.send('Api is running..');
  });
}

// Not Found Route
app.use(notFound);

// Error Handler for Express
// Express handles any route with four arguments as error handling middleware
app.use(errorHandler);

const { PORT = 5000, NODE_ENV = 'development' } = process.env;
app.listen(PORT, console.log(`server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold));
