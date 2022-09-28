import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

const ShippingForm = ({ closeForm }) => {
	const userInfo = useLoadUser();
	const dispatch = useDispatch();
	const history = useHistory();

	const [state, setState] = React.useReducer(
		(state, newState) => ({ ...state, ...newState }),
		initAddress
	);

	const { name, address, city, postalCode, country, addressType } = state;

	const enableContinue =
		name && address && city && postalCode && country && addressType;

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(state);
		dispatch(saveShippingAddressAction(state, history));
	};

	return (
		<FormContainer className='my-5 mx-0 max-width-800' xs={12} md={12}>
			<Row className='justify-content-between m-0'>
				<h3>Add new address</h3>
				<Button className='btn mb-2' size='sm' variant='danger' onClick={closeForm}>
					Close and select saved address
				</Button>
			</Row>
			<Form
				onSubmit={submitHandler}
				className='mt-3'
			>
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

				<Row className='mr-0 ml-0 justify-content-between'>
					<Form.Group controlId='city' className='side-by-side'>
						<Form.Label>City</Form.Label>
						<Form.Control
							placeholder='Enter city'
							value={city}
							onChange={(e) => setState({ city: e.target.value })}
						/>
					</Form.Group>

					<Form.Group controlId='postalCode' className='side-by-side'>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter postal code'
							value={postalCode}
							onChange={(e) => setState({ postalCode: e.target.value })}
						/>
					</Form.Group>
				</Row>
				<Row className='mr-0 ml-0 justify-content-between'>
					<Form.Group controlId='country' className='side-by-side'>
						<Form.Label>Country</Form.Label>
						<Form.Control
							placeholder='Enter country'
							value={country}
							onChange={(e) => setState({ country: e.target.value })}
						/>
					</Form.Group>

					<Form.Group controlId='addressType' className='side-by-side'>
						<Form.Label>Address Type</Form.Label>
						<Form.Control
							as='select'
							value={addressType}
							onChange={(e) => setState({ addressType: e.target.value })}
						>
							<option value='HOME'>Home</option>
							<option value='OFFICE'>Office</option>
						</Form.Control>
					</Form.Group>
				</Row>

				<Form.Group controlId='continueBtn'>
					<Button
						type='submit'
						className='px-5 mt-3'
						disabled={!enableContinue}
					>
						Save Address
					</Button>
				</Form.Group>
			</Form>
		</FormContainer>
	);
};

export default ShippingForm;
