import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';

const authorizeUser = asyncHandler(async (req, res, next) => {
  let token;

  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized, Please log in');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, Please log in');
  }
});

export default authorizeUser;
