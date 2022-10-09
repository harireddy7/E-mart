import React from 'react';
import { Image, Table } from 'react-bootstrap';
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
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Product(s)</th>
					<th>Total</th>
					<th>Order Date</th>
					<th>Paid</th>
					<th>Delivered</th>
				</tr>
			</thead>
			<tbody>
				{orders.map((order) => (
					<tr key={order._id}>
						<td>
							<Image
								src={order.orderItems[0].product.image}
								style={{ maxWidth: '70px', border: '2px solid #fff' }}
							/>
              <span className='ml-3'>{order.orderItems.length > 1 ? `+ ${order.orderItems.length - 1}` : ''}</span>
						</td>
						<td>{order.totalPrice.toLocaleString('en-IN')}</td>
            <td>{new Date(order.paidAt).toString().substring(0, 24)}</td>
						<td>{order.isPaid ? 'Yes' : 'No'}</td>
						<td>{order.isDelivered ? 'Yes' : 'No'}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default OrdersScreen;
