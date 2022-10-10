import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersAction } from '../store/actions/actionCreators/orderActions';

const OrdersScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { orders } = useSelector((store) => store.user);

	React.useEffect(() => {
		if (!orders) {
			dispatch(getOrdersAction(history));
		}
	}, []);

	if (!orders) return <div>OrdersScreen</div>;

	return (
		<>
			{orders.map((order) => (
				<Card key={order._id} className='my-4'>
					<Card.Header as='h6'>
						<div>
							Status:
							<Badge bg='warning' pill style={{ padding: '5px 6px 4px 8px' }}>
								Dispatched
							</Badge>
						</div>
						<div className='mt-2'>
							Total Price: {order.totalPrice.toLocaleString('en-IN')}
						</div>
						<div className='mt-2 small'>Order #{order._id}</div>
					</Card.Header>
					<Card.Body>
						<hr />
						<div className='d-flex flex-wrap'>
							{order.orderItems.map((item) => (
								<div className='d-flex flex-column m-2'>
									<Card.Img
										src={item.product.image}
										style={{ maxWidth: '150px' }}
									/>
									<Card.Title className='mt-3'>{item.product.name}</Card.Title>
								</div>
							))}
						</div>
						<Card.Text>
							Ordered on {new Date(order.paidAt).toDateString()}
						</Card.Text>
						<Card.Text>
							Will be delivered to{' '}
							<span className='font-weight-bold'>
								{order.shippingAddress.name}({order.shippingAddress.addressType}
								)
							</span>
						</Card.Text>
						<Card.Text>
							Address: {order.shippingAddress.address},{' '}
							{order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
							{order.shippingAddress.country}
						</Card.Text>
					</Card.Body>
				</Card>
			))}
		</>
	);
};

export default OrdersScreen;
