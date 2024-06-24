import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loginWithOAuth } from '../../store/actions/actionCreators/userActions';
import axiosInstance from '../../axiosInstance';

const OIDCAuthCallback = () => {
	const { search } = useLocation();
	const dispatch = useDispatch();

	const queryParams = new URLSearchParams(search);
	const code = queryParams.get('code');
	const state = queryParams.get('state');

	useEffect(() => {
		if (code && state) {
			console.log(code);
			console.log(state);
			const codeVerifier = sessionStorage.getItem('__tp_cv__');
			// dispatch(loginWithOAuth({ code }));

			const tokenRequestBody = new URLSearchParams();
			tokenRequestBody.append('grant_type', 'authorization_code');
			tokenRequestBody.append('scope', encodeURIComponent('email profile'));
			tokenRequestBody.append('code', encodeURIComponent(code));
			tokenRequestBody.append('code_verifier', codeVerifier);
			// tokenRequestBody.append('code', code);
			tokenRequestBody.append(
				'client_id',
				'GOOGLE OAUTH CLIENT ID',
			);
			tokenRequestBody.append(
				'client_secret',
				'GOOGLE OAUTH CLIENT SECRET',
			);
			tokenRequestBody.append(
				'redirect_uri',
				encodeURIComponent('http://localhost:3000/callback'),
			);

			// JSON.stringify({
			//   grant_type: 'authorization_code',
			//   code,
			//   client_id:
			//     'GOOGLE OAUTH CLIENT ID',
			//   client_secret: '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',
			//   redirect_uri: encodeURIComponent('http://localhost:3000/callback'),
			// }),

			axiosInstance
				.post(
					// 'https://www.googleapis.com/oauth2/v4/token',
					'https://oauth2.googleapis.com/token',
					tokenRequestBody,
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
					},
				)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	}, [code]);

	return <div>{code}</div>;
};

export default OIDCAuthCallback;
