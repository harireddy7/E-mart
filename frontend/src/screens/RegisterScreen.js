import React, { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { registerAction } from '../store/actions/actionCreators/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector(store => store.userRegister);

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
      setMessage('Passwords not match');
      setTimeout(() => {
        setMessage('');
      }, 1000);
    }
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="registerBtn">
          <Button type="submit">Register</Button>
        </Form.Group>
      </Form>

      <Row className="py-3">
        New User? <NavLink to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login here!</NavLink>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
