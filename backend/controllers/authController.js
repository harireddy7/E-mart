import asyncHandler from 'express-async-handler';
import axios from 'axios';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

// LOGIN
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error('Missing email or password');
	}

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// REGISTER
export const registerUser = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body;
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({ email, password, name });

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// OAuth
export const loginWithOAuth = asyncHandler(async (req, res) => {
	const { code } = req.body;

	const response = await axios
		.get('https://accounts.google.com/.well-known/openid-configuration')
		.then((res) => {
			const tokenRequestBody = new URLSearchParams();
			tokenRequestBody.append('grant_type', 'authorization_code');
			tokenRequestBody.append('code', code);
			tokenRequestBody.append('client_id', process.env.OIDC_CLIENT_ID);
			tokenRequestBody.append('client_secret', process.env.OIDC_CLIENT_SECRET);
			tokenRequestBody.append(
				'redirect_uri',
				encodeURIComponent('http://localhost:3000/callback'),
			);

			return axios.post(res.data.token_endpoint, tokenRequestBody, {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			});
		})
		.catch((err) => console.log(err));

	console.log(response);

	// const userExists = await User.findOne({ email });

	// if (userExists) {
	//   res.status(400);
	//   throw new Error('User already exists');
	// }

	// const user = await User.create({ email, password, name });

	res.status(200).json({
		data: response.data,
	});

	// if (user) {
	// 	res.status(201).json({
	// 		_id: user._id,
	// 		name: user.name,
	// 		email: user.email,
	// 		isAdmin: user.isAdmin,
	// 		token: generateToken(user._id),
	// 	});
	// } else {
	// res.status(400);
	// throw new Error('Invalid user data');
	// }
});
