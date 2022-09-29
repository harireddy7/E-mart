import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import FormContainer from '../../components/FormContainer';
import useLoadUser from '../../hooks/useLoadUser';
import { savePaymentMethod } from '../../store/actions/actionCreators/userActions';
import OrderSummary from './OrderSummary';

const PaymentScreen = ({ history }) => {
	const userInfo = useLoadUser();
	const { selectedAddressId } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!selectedAddressId) {
			history.push('/shipping');
		}
	}, [selectedAddressId]);

	const submitHandler = (e) => {
		// e.preventDefault();
		// if (paymentMethod) {
		//   dispatch(savePaymentMethod(paymentMethod));
		//   history.push('/placeorder');
		// }
	};

	return (
		<FormContainer md={12} className='checkout-container'>
			<CheckoutSteps step1={!userInfo} step2 step3 />
			<OrderSummary />
			<Button className='my-4'>Pay with razorpay</Button>
		</FormContainer>
	);
};

export default PaymentScreen;
