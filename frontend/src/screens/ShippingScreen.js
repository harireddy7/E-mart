import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../store/actions/actionCreators/userActions';

const ShippingScreen = ({ history }) => {
  const { userInfo, shippingAddress } = useSelector(store => {
    return {
      userInfo: store.userLogin.userInfo,
      shippingAddress: store.userShippingAddress.shippingAddress
    };
  });
  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=shipping');
    }
  }, [userInfo, history]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h3>Shipping</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="city" placeholder="Enter city" value={city} onChange={e => setCity(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="continueBtn">
          <Button type="submit">Continue</Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
