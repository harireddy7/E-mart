import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import FormContainer from '../../components/FormContainer';
import useLoadUser from '../../hooks/useLoadUser';
import { saveShippingAddressAction } from '../../store/actions/actionCreators/userActions';

const initAddress = {
	name: '',
	address: '',
	city: '',
	postalCode: '',
	country: '',
	addressType: 'HOME',
};

const ShippingForm = ({ history }) => {
	const userInfo = useLoadUser();
	const dispatch = useDispatch();

	const [state, setState] = React.useReducer(
		(state, newState) => ({ ...state, ...newState }),
		initAddress
	);

	const { name, address, city, postalCode, country, addressType } = state;

	const enableContinue = name && address && city && postalCode && country && addressType;

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(state);
		dispatch(saveShippingAddressAction(state, history));
	};

	return (
		<FormContainer>
			<CheckoutSteps step1={!userInfo} step2 />
			<h3>Shipping</h3>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						placeholder='Enter Name'
						value={name}
						onChange={(e) => setState({ name: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						placeholder='Enter address'
						value={address}
						onChange={(e) => setState({ address: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						placeholder='Enter city'
						value={city}
						onChange={(e) => setState({ city: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='number'
						placeholder='Enter postal code'
						value={postalCode}
						onChange={(e) => setState({ postalCode: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						placeholder='Enter country'
						value={country}
						onChange={(e) => setState({ country: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId='addressType'>
					<Form.Label>Address Type</Form.Label>
					<Form.Control as='select' value={ addressType } onChange={(e) => setState({ addressType: e.target.value })}>
						<option value='HOME'>Home</option>
						<option value='OFFICE'>Office</option>
					</Form.Control>
				</Form.Group>

				<Form.Group controlId='continueBtn'>
					<Button type='submit' disabled={ !enableContinue }>Continue</Button>
				</Form.Group>
			</Form>
		</FormContainer>
	);
};

export default ShippingForm;
