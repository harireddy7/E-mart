import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv'
import Razorpay from 'razorpay';
import Order from '../models/order.js';

dotenv.config();

const razorpayOptions = {
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
}

var instance = new Razorpay(razorpayOptions);

export const createOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items found!');
    return;
  } else {
    const orderOptions = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id
      }
    }

    instance.orders.create(orderOptions, async (err, order) => {
      if (err) {
        res.status(500);
        throw new Error('Something went wrong!');
        return;
      }
      res.status(201).json(createdOrder);
    })


    const order = await instance.orders.create(orderOptions);

    if (!order) return res.status(500).send("Some error occured");

    res.status(201).json(createdOrder);

    // const createdOrder = await newOrder.save();

    // res.status(201).json(createdOrder);
  }
});

export const getOrderItems = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ paidAt: -1 });
  res.status(200).json(orders);
})
