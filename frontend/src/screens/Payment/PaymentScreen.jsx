import React from 'react';
import { Button, Form, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import FormContainer from '../../components/FormContainer';
import useLoadUser from '../../hooks/useLoadUser';
import { savePaymentMethod } from '../../store/actions/actionCreators/userActions';
import OrderSummary from '../OrderSummary/OrderSummary';
import razorpayImg from '../../assets/razorpay.svg';

const PaymentScreen = ({ history }) => {
	const userInfo = useLoadUser();
	const { selectedAddressId } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	// React.useEffect(() => {
	// 	if (!selectedAddressId) {
	// 		history.push('/shipping');
	// 	}
	// }, [selectedAddressId]);

	const submitHandler = (e) => {
		// e.preventDefault();
		// if (paymentMethod) {
		//   dispatch(savePaymentMethod(paymentMethod));
		//   history.push('/placeorder');
		// }
	};

	return (
		<FormContainer md={12} className='checkout-container'>
			<CheckoutSteps step1={!userInfo} step2 step3 step4 />
			<div className='d-flex justify-content-center my-5'>
				<Button className='my-4 bg-light text-dark border-primary d-flex align-items-center'>
					<div>Pay with </div>
					<div>
						<Image
							style={{ maxWidth: '80px', marginBottom: '5px' }}
							className='ml-2'
							src={razorpayImg}
						/>
					</div>
				</Button>
			</div>
		</FormContainer>
	);
};

export default PaymentScreen;
