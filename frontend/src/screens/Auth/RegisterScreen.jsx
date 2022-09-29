import React, { useEffect } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { registerAction } from '../../store/actions/actionCreators/userActions';

const initState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  message: '',
};

const RegisterScreen = ({ location, history }) => {
  const [state, setState] = React.useReducer((state, nextState) => ({ ...state, ...nextState }), initState);
  const { name, email, password, confirmPassword, message } = state;

  const { isLoading, actionMessage, data: userInfo } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(registerAction({ name, email, password }));
    } else {
      setState({ message: 'Passwords not match' });
      setTimeout(() => {
        setState({ message: null });
      }, 1000);
    }
  };

  return (
    <FormContainer className='my-4'>
      <h1>Register</h1>
      {actionMessage && actionMessage.type === 'error' && <Message variant="danger">{actionMessage.message}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className='my-4'>
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter name" value={name} onChange={e => setState({ name: e.target.value })} />
        </Form.Group>

        <Form.Group controlId="email" className='my-4'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setState({ email: e.target.value })} />
        </Form.Group>

        <Form.Group controlId="password" className='my-4'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setState({ password: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className='my-4'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setState({ confirmPassword: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="registerBtn" className='my-4'>
          <Button type="submit" className='px-5' disabled={ !name || !email || !password || !confirmPassword || message }>Register</Button>
        </Form.Group>
      </Form>

      <Row className="py-3 m-0">
        New User? <NavLink to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ marginLeft: '5px' }}>Login here!</NavLink>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
