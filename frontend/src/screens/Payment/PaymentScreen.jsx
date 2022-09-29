import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import FormContainer from '../../components/FormContainer';
import useLoadUser from '../../hooks/useLoadUser';
import { savePaymentMethod } from '../../store/actions/actionCreators/userActions';
import OrderSummary from './OrderSummary';

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
    <FormContainer md={12}>
      <CheckoutSteps step1={!userInfo} step2 step3 />
      <OrderSummary />
      <Button className='my-4'>Pay with razorpay</Button>
    </FormContainer>
  );
};

export default PaymentScreen;
