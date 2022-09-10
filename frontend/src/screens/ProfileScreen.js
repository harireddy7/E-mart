import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrdersAction } from '../store/actions/actionCreators/orderActions';
import { getUserDetails, updateProfileAction, resetToDefaults } from '../store/actions/actionCreators/userActions';
import HomeScreen from './HomeScreen';

const ProfileScreen = ({ history }) => {
  const { userInfo, userDetails, updatedProfile, userOrders } = useSelector(store => {
    return {
      userDetails: store.userDetails,
      userInfo: store.userLogin.userInfo,
      updatedProfile: store.updateProfile,
      userOrders: store.userOrders,
    };
  });
  const { loading, error, user } = userDetails || {};
  const { loading: updateLoading, error: updateError, user: updateUser, success } = updatedProfile || {};
  const dispatch = useDispatch();

  console.log(userOrders)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userInfo && userInfo._id) {
      if (!user) {
        dispatch(getUserDetails(userInfo._id));
      } else {
        dispatch(getOrdersAction());
      }
    } else {
      history.push('/');
    }
  }, [userInfo, user, history, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (success && updateUser) {
      setPassword('');
      setConfirmPassword('');
    }
  }, [success, updateUser]);

  useEffect(() => {
    return () => dispatch(resetToDefaults());
  }, [dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    if (!user) return;
    if (!password && !confirmPassword) {
      const { _id } = user;
      dispatch(updateProfileAction({ _id, name, email }));
    } else if (password || confirmPassword) {
      if (password && confirmPassword) {
        if (password === confirmPassword) {
          const { _id } = user;
          dispatch(updateProfileAction({ _id, name, email, password }));
        } else {
          setMessage('Passwords not match');
          setTimeout(() => {
            setMessage('');
          }, 1000);
        }
      } else {
        setMessage('Enter valid Password(s)');
        setTimeout(() => {
          setMessage('');
        }, 1000);
      }
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h3>User Profile</h3>
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {!updateLoading && (updateError || success) && (
          <Message variant={success ? 'info' : 'danger'}>{updateError ? updateError : 'User profile updated!'}</Message>
        )}
        {updateLoading && <Loader />}
        <Form onSubmit={submitHandler} className="mt-4">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
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

          <Form.Group controlId="updateBtn">
            <Button type="submit">Update Profile</Button>
          </Form.Group>
        </Form>
      </Col>
      <Col md={8}>
        <h3>My Orders</h3>
        <HomeScreen showOrders />
      </Col>
    </Row>
  );
};

export default ProfileScreen;
