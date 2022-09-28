import React, { useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';

import useLoadUser from '../../hooks/useLoadUser';
import { getShippingAddressAction } from '../../store/actions/actionCreators/userActions';
import ShippingCard from './ShippingCard';
import ShippingForm from './ShippingForm';

const ShippingScreen = ({ history }) => {
	const userInfo = useLoadUser();
	const { shippingAddress } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const [showShippingForm, setShowShippingForm] = React.useState(false);
	const [selectedAddress, setSelectedAddress] = React.useState();

	React.useEffect(() => {
		if (!shippingAddress) {
			dispatch(getShippingAddressAction());
		}
	}, []);

	const [address, setAddress] = useState(shippingAddress?.address);
	const [city, setCity] = useState(shippingAddress?.city);
	const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
	const [country, setCountry] = useState(shippingAddress?.country);

	const submitHandler = (e) => {
		e.preventDefault();
		const _address = { address, city, postalCode, country };
		console.log(_address);
		// dispatch(saveShippingAddressAction(_address, history));
	};

	if (!shippingAddress) return <Loader />;

	return (
		<FormContainer md={12}>
			<CheckoutSteps step1={!userInfo} step2 />
			<Row style={{ pointerEvents: showShippingForm ? 'none' : 'auto' }}>
				{shippingAddress.map((address) => (
					<ShippingCard
						key={address._id}
						address={address}
						isSelected={address._id.toString() === selectedAddress}
						onClick={(addressId) => setSelectedAddress(addressId)}
						showShippingForm={showShippingForm}
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
			{showShippingForm && <ShippingForm closeForm={() => setShowShippingForm(false)} />}
		</FormContainer>
	);

	// return <ShippingForm />
};

export default ShippingScreen;
