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
			isAdmin: user.isAdmin,
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
			token: generateToken(updatedUser._id),
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
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(400);
		throw new Error('User not found');
	}
});

// GET CART ITEMS
export const getUserCart = asyncHandler(async (req, res) => {
	if (req.user) {
		const user = await User.findById(req.user._id);
		return res.json({
			cart: user.cart,
		});
	}

	res.status(404);
	throw new Error('User not found');
});

// ADD ITEM TO CART
export const addToCart = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		const { id, quantity } = req.body;
		const _cart = user.cart;
		const isItemInCart = _cart.find(
			(item) => item.product._id.toString() === id
		);
		if (!isItemInCart) {
			user.cart = [..._cart, { product: id, quantity }];
		} else {
			// if already present override the quantity
			const filteredCart = _cart.filter(
				(item) => item.product._id.toString() !== id
			);
			user.cart = [{ product: id, quantity }, ...filteredCart];
		}
		const updatedUser = await user.save();
		// console.log(updatedUser.cart);

		res.json({
			cart: updatedUser.cart,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// REMOVE ITEM FROM CART
export const removeFromCart = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		const { id } = req.params;
		const _cart = user.cart;
		const isItemInCart = _cart.find(
			(item) => item.product._id.toString() === id
		);
		if (isItemInCart) {
			user.cart = _cart.filter((item) => item.product._id.toString() !== id);
			const updatedUser = await user.save();
			res.json({
				cart: updatedUser.cart,
			});
		} else {
			res.status(400);
			throw new Error('Product not present in the cart');
		}
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// CLEAR CART
export const clearUserCart = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.cart = [];
		const updatedUser = await user.save();
		res.json({
			cart: updatedUser.cart,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});


// GET SHIPPING ADDRESS
export const getShippingAddress = asyncHandler(async (req, res) => {
	if (req.user) {
		const user = await User.findById(req.user._id);
		return res.json({
			shippingAddress: user.shippingAddress,
		});
	}

	res.status(404);
	throw new Error('User not found');
})

// SAVE SHIPPING ADDRESS
export const saveShippingAddress = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		const { name, address, city, postalCode, country, addressType } = req.body;
		const _shippingAddress = user.shippingAddress;
		const isAddressAlreadySaved = _shippingAddress.find(
			(item) => item.address.trim() === address.trim()
		);
		if (!isAddressAlreadySaved) {
			user.shippingAddress = [..._shippingAddress, { name, address, city, postalCode, country, addressType }];
		} else {
			res.status(400);
			throw new Error('Same address already saved. Please add new one!');
		}
		const updatedUser = await user.save();
		res.status(201).json({
			shippingAddress: updatedUser.shippingAddress,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
})

// REMOVE SHIPPING ADDRESS
export const removeShippingAddress = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		const { id } = req.params;
		const _shippingAddress = user.shippingAddress;
		const isAddressAlreadySaved = _shippingAddress.find(
			(item) => item._id.toString() === id
		);
		if (isAddressAlreadySaved) {
			user.shippingAddress = _shippingAddress.filter((item) => item._id.toString() !== id);
			const updatedUser = await user.save();
			res.json({
				shippingAddress: updatedUser.shippingAddress,
			});
		} else {
			res.status(400);
			throw new Error('Invalid address, unable to proceed!');
		}
	} else {
		res.status(404);
		throw new Error('User not found');
	}
})