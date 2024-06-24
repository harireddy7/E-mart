import React, { useEffect } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { loginAction } from '../../store/actions/actionCreators/userActions';
import axiosInstance from '../../axiosInstance';

const initState = {
	email: '',
	password: '',
};

// Generate a random string for the code_verifier
const generateCodeVerifier = () => {
	const array = new Uint32Array(32);
	window.crypto.getRandomValues(array);
	return array.join('');
};

// Generate a base64url-encoded SHA256 hash of the code_verifier
const generateCodeChallenge = (codeVerifier) => {
	const hash = CryptoJS.SHA256(codeVerifier);
	return hash
		.toString(CryptoJS.enc.Base64)
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
};

const getCodeChallenge = () => {
	const codeVerifier = generateCodeVerifier();
	const codeChallenge = generateCodeChallenge(codeVerifier);
	sessionStorage.setItem('__tp_cv__', codeVerifier);
	return codeChallenge;
};

const LoginScreen = ({ location, history }) => {
	const [state, setState] = React.useReducer(
		(state, nextState) => ({ ...state, ...nextState }),
		initState,
	);
	const { email, password } = state;

	const {
		isLoading,
		actionMessage,
		data: userInfo,
	} = useSelector((store) => store.user);
	const _token = localStorage.getItem('__JWT_TOKEN__');
	const loggedUser = localStorage.getItem('__LUSER__');
	const dispath = useDispatch();

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo && _token && loggedUser) {
			history.push(redirect);
		}
	}, [userInfo, history, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispath(loginAction({ email, password }));
	};

	const handleGoogleAuth = async () => {
		try {
			const response = await axiosInstance.get(
				'https://accounts.google.com/.well-known/openid-configuration',
			);
			const authEndpoint = response.data.authorization_endpoint;
			const params = {
				client_id: 'GOOGLE_CLIENT_ID',
				redirect_uri: 'http://localhost:3000/callback',
				response_type: 'code',
				scope: 'openid email profile',
				state: 'login',
				include_granted_scopes: true,
				// code_challenge: getCodeChallenge(),
				// code_challenge_method: 'S256',
			};
			const queryParams = new URLSearchParams(params);
			window.location.href = `${authEndpoint}?${queryParams}`;
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<FormContainer className="my-4">
			<h1>Login</h1>
			{actionMessage && actionMessage.type === 'error' && (
				<Message variant="danger">{actionMessage.message}</Message>
			)}
			{isLoading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email" className="my-4">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setState({ email: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId="password" className="my-4">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setState({ password: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId="loginBtn" className="my-4">
					<Button
						type="submit"
						className="px-5 w-100"
						disabled={!email || !password}
					>
						Login
					</Button>
				</Form.Group>

				<Form.Group controlId="loginBtn" className="my-4">
					<Button
						type="button"
						className="px-5 w-100"
						variant="info"
						onClick={handleGoogleAuth}
					>
						Login with Google
					</Button>
				</Form.Group>
			</Form>

			<Row className="py-3">
				New User?{' '}
				<NavLink
					to={redirect ? `/register?redirect=${redirect}` : '/register'}
					style={{ marginLeft: '5px' }}
				>
					Register here!
				</NavLink>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
