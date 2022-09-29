import React from 'react';
import { Card, ListGroup, Row } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader';
import CartItem from '../Cart/CartItem';

const OrderSummary = () => {
	const {
		cart: cartItems,
		shippingAddress,
		selectedAddressId,
	} = useSelector((store) => store.user);
	const history = useHistory();
	const selectedAddress = shippingAddress?.find(
		(add) => add._id === selectedAddressId
	);

	React.useEffect(() => {
		if (!cartItems) {
			history.push('/cart');
		}
	}, [cartItems]);

	if (!cartItems) return <Loader />;

	return (
		<Stack gap={3} className='d-flex flex-column' style={{ gap: '1rem' }}>
			<div className='bg-light border p-3'>
				<div className='font-weight-bold'>Your Order</div>
				<div className='my-4'>
					{cartItems.map((item) => (
						<CartItem key={item._id} cartItem={item} isReadOnly />
					))}
				</div>
			</div>
			{selectedAddressId && (
				<div className='bg-light border p-3'>
					<div className='font-weight-bold'>Shipping Address</div>
					<Row className='px-3 py-4'>
						<Card className='w-100'>
							<Card.Header>{selectedAddress.name}</Card.Header>
							<ListGroup variant='flush'>
								<ListGroup.Item>{selectedAddress.address}</ListGroup.Item>
								<ListGroup.Item style={{ textTransform: 'capitalize' }}>
									{selectedAddress.city}, {selectedAddress.country} -{' '}
									{selectedAddress.postalCode}
								</ListGroup.Item>
								<ListGroup.Item>{selectedAddress.addressType}</ListGroup.Item>
							</ListGroup>
						</Card>
					</Row>
				</div>
			)}
		</Stack>
	);
};

export default OrderSummary;
