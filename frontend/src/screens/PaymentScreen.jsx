import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import useLoadUser from '../hooks/useLoadUser';
import { savePaymentMethod } from '../store/actions/actionCreators/userActions';

const PaymentScreen = ({ history }) => {
  const userInfo = useLoadUser();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState();

  const submitHandler = e => {
    e.preventDefault();
    console.log(paymentMethod);
    if (paymentMethod) {
      dispatch(savePaymentMethod(paymentMethod));
      history.push('/placeorder');
    }
  };

  return (
    <FormContainer>
      <Row className="mb-3">
        <CheckoutSteps step1={!userInfo} step2 step3 />
        <h3>Payment Method</h3>
      </Row>
      <Row>
        <Form className="mt-3" onSubmit={submitHandler}>
          <h5>Select Method</h5>
          <Form.Group controlId="paymentMethod">
            <Form.Check
              type="radio"
              name="paymentMethod"
              id="paypal"
              label="PayPal or Credit Card"
              value="PayPal"
              onChange={e => setPaymentMethod(e.target.value)}
              className="my-1"
              checked={paymentMethod === 'PayPal'}
            />
            <Form.Check
              type="radio"
              name="paymentMethod"
              id="stripe"
              label="Stripe"
              value="Stripe"
              onChange={e => setPaymentMethod(e.target.value)}
              className="my-1"
              checked={paymentMethod === 'Stripe'}
            />
          </Form.Group>
          <Form.Group controlId="continueBtn">
            <Button type="submit">Continue</Button>
          </Form.Group>
        </Form>
      </Row>
    </FormContainer>
  );
};

export default PaymentScreen;
