import React, { useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import useLoadUser from '../../hooks/useLoadUser';
import {
	getShippingAddressAction,
	removeShippingAddressAction,
} from '../../store/actions/actionCreators/userActions';
import ShippingCard from './ShippingCard';
import ShippingForm from './ShippingForm';

const ShippingScreen = ({ history }) => {
	const userInfo = useLoadUser();
	const { shippingAddress, selectedAddressId } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const [showShippingForm, setShowShippingForm] = React.useState(false);
	const [selectedAddress, setSelectedAddress] = React.useState(selectedAddressId);

	React.useEffect(() => {
		if (!shippingAddress) {
			dispatch(getShippingAddressAction());
		}
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();
		const _address = shippingAddress?.find(add => add._id === selectedAddress);
		// console.log(_address);
		dispatch({
			type: 'SELECT_SHIPPING_ADDRESS',
			payload: selectedAddress
		});
		history.push('/payment');
	};

	const removeAddress = (id) => {
		dispatch(removeShippingAddressAction(id));
	};

	if (!shippingAddress) return <Loader />;

	return (
		<FormContainer md={12}>
			<CheckoutSteps step1={!userInfo} step2 step3={selectedAddressId} />
			<Row style={{ pointerEvents: showShippingForm ? 'none' : 'auto' }}>
				{shippingAddress.map((address) => (
					<ShippingCard
						key={address._id}
						address={address}
						isSelected={address._id === selectedAddress}
						onClick={(addressId) => setSelectedAddress(addressId)}
						showShippingForm={showShippingForm}
						handleRemove={removeAddress}
					/>
				))}
				<Card
					style={{
						minWidth: '220px',
						borderRadius: '8px',
						margin: '0.5em',
						cursor: 'pointer',
						border: '2px dashed #b8cdcc',
					}}
					onClick={() => setShowShippingForm(!showShippingForm)}
				>
					<Card.Body className='d-flex flex-column justify-content-center align-items-center'>
						<Card.Text style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>
							+
						</Card.Text>
						<Card.Text>Add Address</Card.Text>
					</Card.Body>
				</Card>
			</Row>

			{showShippingForm ? (
				<ShippingForm closeForm={() => setShowShippingForm(false)} />
			) : (
				<Row className='my-4'>
					<Button className='my-4' disabled={ !selectedAddress } onClick={submitHandler}>Continue to payment</Button>
				</Row>
			)}
		</FormContainer>
	);
};

export default ShippingScreen;
