import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';

import Loader from '../../components/Loader';
import {
	getUserDetails,
	updateProfileAction,
} from '../../store/actions/actionCreators/userActions';
import FormContainer from '../../components/FormContainer';
import { getLoggedInUser } from '../../utils';
import Message from '../../components/Message';

const initState = {
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
	message: '',
};

const ResetPassword = ({ history }) => {
	const {
		isLoading,
		actionMessage,
		data: userInfo,
	} = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const [state, setState] = React.useReducer(
		(state, nextState) => ({ ...state, ...nextState }),
		initState
	);
	const { currentPassword, newPassword, confirmPassword, message } = state;

	const _user = getLoggedInUser();

	React.useEffect(() => {
		if (!userInfo && !_user) {
			history.push('/login');
		} else if (!userInfo && _user && _user._id) {
			dispatch(getUserDetails(_user._id));
		}
	}, [userInfo]);

	React.useEffect(() => {
		if (!actionMessage) {
			setState(initState);
		}
	}, [actionMessage]);

	const submitHandler = (e) => {
		e.preventDefault();
		const { _id } = userInfo;

		if (newPassword || confirmPassword) {
			if (newPassword !== confirmPassword) {
				return setState({ message: `New passwords don't match` });
			} else {
				setState({ message: '' });
			}
		}

		if (currentPassword && newPassword && confirmPassword) {
			dispatch(
				updateProfileAction(
					{ _id, password: currentPassword, newPassword },
					'/users/profile/reset-password'
				)
			);
		}
	};

	return (
		<>
			<Link
				to='#'
				onClick={() => history.go(-1)}
				className='btn btn-light btn-sm my-3 rounded'
			>
				<i className='fas fa-chevron-left mr-2'></i>Back
			</Link>
			<FormContainer>
				<Row>
					<Col>
						<h3>Reset Password</h3>
						{isLoading && <Loader />}
						{actionMessage && actionMessage.type === 'error' && (
							<Message variant='danger'>{actionMessage.message}</Message>
						)}
						{message && <Message variant='danger'>{message}</Message>}
						<Form onSubmit={submitHandler} className='mt-4'>
							<Form.Group controlId='password'>
								<Form.Label>Current Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Enter current password'
									value={currentPassword}
									onChange={(e) =>
										setState({ currentPassword: e.target.value })
									}
								/>
							</Form.Group>
							<Form.Group controlId='newPassword'>
								<Form.Label>New Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Enter new password'
									value={newPassword}
									onChange={(e) => setState({ newPassword: e.target.value })}
								/>
							</Form.Group>

							<Form.Group controlId='confirmPassword'>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Confirm password'
									value={confirmPassword}
									onChange={(e) =>
										setState({ confirmPassword: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group controlId='updateBtn'>
								<Button type='submit' style={{ padding: '0.75em 5em' }}>
									Update
								</Button>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</FormContainer>
		</>
	);
};

export default ResetPassword;
