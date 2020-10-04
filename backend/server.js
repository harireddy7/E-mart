import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import products from './data/products.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (_, res) => {
  res.send('Api is running..');
});

app.get('/api/products', (_, res) => {
  res.json(products);
});

app.get('/api/product/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

const { PORT = 5000, NODE_ENV } = process.env;
app.listen(PORT, console.log(`server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold));
