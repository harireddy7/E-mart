import React, { useEffect } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { loginAction } from '../../store/actions/actionCreators/userActions';

const initState = {
  email: '',
  password: ''
};

const LoginScreen = ({ location, history }) => {
  const [state, setState] = React.useReducer((state, nextState) => ({ ...state, ...nextState }), initState);
  const { email, password } = state;

  const { isLoading, actionMessage, data: userInfo } = useSelector(store => store.user);
  const dispath = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispath(loginAction({ email, password }));
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      {actionMessage && actionMessage.type === 'error' && <Message variant="danger">{actionMessage.message}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setState({ email: e.target.value })} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setState({ password: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="loginBtn">
          <Button type="submit" disabled={ !email || !password }>Login</Button>
        </Form.Group>
      </Form>

      <Row className="py-3">
        New User? <NavLink to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ marginLeft: '5px' }}>Register here!</NavLink>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
