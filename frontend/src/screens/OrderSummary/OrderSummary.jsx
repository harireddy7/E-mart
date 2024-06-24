import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, Button, Row, Col, Image } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Loader from '../../components/Loader';
import CartItem from '../Cart/CartItem';
import CheckoutSteps from '../../components/CheckoutSteps';
import FormContainer from '../../components/FormContainer';
import useLoadUser from '../../hooks/useLoadUser';
import { createOrderAndShowRazorpay, getCartPrice } from '../../utils';
import razorpayImg from '../../assets/razorpay.svg';

const OrderSummary = ({ history }) => {
	const userInfo = useLoadUser();
	const {
		cart: cartItems,
		shippingAddress,
		selectedAddressId,
	} = useSelector((store) => store.user);
	const selectedAddress = shippingAddress?.find(
		(add) => add._id === selectedAddressId,
	);

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!cartItems) {
			return history.push('/cart');
		}
		if (!selectedAddressId) {
			return history.push('/shipping');
		}
	}, [cartItems, selectedAddressId]);

	if (!cartItems) return <Loader />;

	const submitHandler = () => {
		const orderData = {
			orderItems: cartItems.map((item) => ({
				...item,
				price: item.product.price,
			})),
			totalPrice: getCartPrice(cartItems).actualPrice,
			shippingAddress: selectedAddress,
		};
		createOrderAndShowRazorpay(orderData, dispatch, history);
	};

	return (
		<FormContainer md={12} className="checkout-container">
			<CheckoutSteps step1={!userInfo} step2 step3 />
			<Stack gap={3} className="d-flex flex-column" style={{ gap: '1rem' }}>
				<div className="bg-light border p-3">
					<div className="font-weight-bold">Your Order</div>
					<div className="my-4">
						{cartItems.map((item) => (
							<CartItem key={item._id} cartItem={item} isReadOnly />
						))}
						<Row className="mb-3 align-items-center justify-content-end">
							<Col
								xs={12}
								sm={4}
								className="font-weight-bold"
								style={{ fontSize: '18px', color: '#000' }}
							>
								Total Price: {getCartPrice(cartItems).formattedPrice}
							</Col>
						</Row>
					</div>
				</div>
				{selectedAddressId && (
					<div className="bg-light border p-3">
						<div className="font-weight-bold">Shipping Address</div>
						<Row className="px-3 py-4">
							<Card className="w-100">
								<Card.Header>{selectedAddress.name}</Card.Header>
								<ListGroup variant="flush">
									<ListGroup.Item>{selectedAddress.address}</ListGroup.Item>
									<ListGroup.Item style={{ textTransform: 'capitalize' }}>
										{selectedAddress.city}, {selectedAddress.country} -{' '}
										{selectedAddress.postalCode}
									</ListGroup.Item>
									<ListGroup.Item>
										Deliver to: {selectedAddress.addressType}
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Row>
					</div>
				)}
				<div className="d-flex justify-content-end">
					<Button
						className="my-4 bg-light text-dark border-primary d-flex align-items-center"
						onClick={submitHandler}
					>
						<div>Pay with </div>
						<div>
							<Image
								style={{ maxWidth: '80px', marginBottom: '5px' }}
								className="ml-2"
								src={razorpayImg}
							/>
						</div>
					</Button>
				</div>
			</Stack>
		</FormContainer>
	);
};

export default OrderSummary;
