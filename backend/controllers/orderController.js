import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';

export const createOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items found!');
    return;
  } else {
    const newOrder = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id
    });

    const createdOrder = await newOrder.save();

    res.status(201).json(createdOrder);
  }
});

export const getOrderItems = asyncHandler(async (req, res) => {
  // const {} = req.body;

  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
})
