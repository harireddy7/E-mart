import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

// GET PROFILE
export const getUserProfileById = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const user = await User.findById(req.user._id);
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  }

  res.status(404);
  throw new Error('User not found');
});

// UPDATE PROFILE
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

// UPDATE PASSWORD
export const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { password, newPassword } = req.body || {};
    if (!password || !newPassword) {
      res.status(400);
      throw new Error('Enter all values!');
    }
    
    if (await user.matchPassword(password)) {
      user.password = newPassword || user.password;
    } else {
      res.status(400);
      throw new Error('Incorrect current password!');
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});
