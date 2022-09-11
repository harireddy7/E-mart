import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrdersAction } from '../store/actions/actionCreators/orderActions';
import { getUserDetails, updateProfileAction, resetToDefaults } from '../store/actions/actionCreators/userActions';
import { isUserLoggedIn } from '../utils';
import HomeScreen from './HomeScreen';

const initState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  message: '',
};

const ProfileScreen = ({ history }) => {
  const { isLoading, actionMessage, data: userInfo, orders: userOrders = [] } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const [state, setState] = React.useReducer((state, nextState) => ({ ...state, ...nextState }), initState);
  const { name, email, password, confirmPassword, message } = state;

  const _user = isUserLoggedIn();

  React.useEffect(() => {
    if (!userInfo && _user && _user.email) {
      dispatch(getUserDetails(_user._id));
    } else {
      // dispatch(getOrdersAction());
    }
  }, []);

  
  React.useEffect(() => {
    if (userInfo && userInfo._id) {
      setState({
        name: userInfo.name,
        email: userInfo.email,
      })
    }
  }, [userInfo])

  // useEffect(() => {
  //   if (success && updateUser) {
  //     setPassword('');
  //     setConfirmPassword('');
  //   }
  // }, [success, updateUser]);

  // useEffect(() => {
  //   return () => dispatch(resetToDefaults());
  // }, [dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    if (!password && !confirmPassword) {
      const { _id } = userInfo;
      dispatch(updateProfileAction({ _id, name, email }));
    } else if (password || confirmPassword) {
      if (password && confirmPassword) {
        if (password === confirmPassword) {
          const { _id } = userInfo;
          dispatch(updateProfileAction({ _id, name, email, password }));
        } else {
          setState({ message: 'Passwords not match' });
        }
      } else {
        setState({ message: 'Enter valid Password(s)' });
      }
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h3>User Profile</h3>
        {message && <Message variant="danger">{message}</Message>}
        {isLoading && <Loader />}
        {/* {error && <Message variant="danger">{error}</Message>}
        {!updateLoading && (updateError || success) && (
          <Message variant={success ? 'info' : 'danger'}>{updateError ? updateError : 'User profile updated!'}</Message>
        )} */}
        {/* {updateLoading && <Loader />} */}
        <Form onSubmit={submitHandler} className="mt-4">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onChange={e => setState({ name: e.target.value })} />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setState({ email: e.target.value })}
            />
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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setState({ confirmPassword: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="updateBtn">
            <Button type="submit">Update Profile</Button>
          </Form.Group>
        </Form>
      </Col>
      {/* <Col md={8}>
        <h3>My Orders</h3>
        <HomeScreen showOrders />
      </Col> */}
    </Row>
  );
};

export default ProfileScreen;
