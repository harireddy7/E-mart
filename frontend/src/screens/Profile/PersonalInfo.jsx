import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';

import Loader from '../../components/Loader';
import { getUserDetails, updateProfileAction } from '../../store/actions/actionCreators/userActions';
import FormContainer from '../../components/FormContainer';
import { getLoggedInUser } from '../../utils';

const initState = {
	name: '',
	email: '',
};

const PersonalInfo = ({ history }) => {
	const {
		isLoading,
		data: userInfo,
	} = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const [state, setState] = React.useReducer(
		(state, nextState) => ({ ...state, ...nextState }),
		initState
	);
	const { name, email } = state;

    const _user = getLoggedInUser();

    React.useEffect(() => {
        console.log({ userInfo })
        if (userInfo && userInfo._id) {
            setState({
                name: userInfo.name,
                email: userInfo.email,
            })
        } else if (_user && _user._id) {
            dispatch(getUserDetails(_user._id));
        } else {
            history.push('/login');
        }
    }, [userInfo])

	const submitHandler = (e) => {
		e.preventDefault();
		const { _id } = userInfo;
		dispatch(updateProfileAction({ _id, name, email }, '/users/profile'));
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
						<h3>Update Personal Info</h3>
						{isLoading && <Loader />}
						<Form onSubmit={submitHandler} className='mt-4'>
							<Form.Group controlId='name'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='name'
									placeholder='Enter name'
									value={name}
									onChange={(e) => setState({ name: e.target.value })}
								/>
							</Form.Group>

							<Form.Group controlId='email'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									value={email}
									onChange={(e) => setState({ email: e.target.value })}
								/>
							</Form.Group>

							<Form.Group controlId='updateBtn'>
								<Button type='submit' style={{ padding: '0.75em 5em' }}>Update</Button>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</FormContainer>
		</>
	);
};

export default PersonalInfo;
