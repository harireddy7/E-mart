import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(400);
      throw new Error('Product not found');
    }
  })
);

export default router;
