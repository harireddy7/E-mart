import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

export const getProducts = asyncHandler(async (_, res) => {
  const products = await Product.find({});
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (product) {
    res.json(product);
  } else {
    res.status(400);
    throw new Error('Product not found');
  }
});
