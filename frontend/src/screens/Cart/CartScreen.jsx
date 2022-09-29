import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	addToCartAction,
	removeFromCart,
	clearCart,
	getUserCartAction,
} from '../../store/actions/actionCreators/cartActions';
import EmptyCartImg from '../../assets/empty-cart.jpg'
import useLoadUser from '../../hooks/useLoadUser';
import CartItem from './CartItem';

const getCartPrice = items => {
  const actualPrice = Number(items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed());
  return { actualPrice, formattedPrice: actualPrice.toLocaleString('en-IN') };
}

const CartScreen = ({ history }) => {
	useLoadUser();
	const { cart: cartItems } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!cartItems) {
			dispatch(getUserCartAction());
		}
	}, []);

	const handleQtyChange = (quantity, productId) => {
		dispatch(addToCartAction({ id: productId, quantity }));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	const handleRemoveProduct = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const handleCheckout = () => {
		const itemsPrice = getCartPrice(cartItems).actualPrice;
		const reqBody = { orderItems: cartItems, totalPrice: itemsPrice };

		history.push('/shipping');
	};

	return (
		<div>
			<Link
				to='#'
				onClick={() => history.go(-1)}
				className='btn btn-light btn-sm my-3 rounded'
			>
				<i className='fas fa-chevron-left mr-2'></i>Back
			</Link>
			<Row>
				<Col xs={8} sm={9}>
					<h3>Shopping Cart</h3>
				</Col>
				<Col xs={4} sm={3} style={{ textAlign: 'right' }}>
					{cartItems && cartItems.length > 0 && (
						<Button
							className='btn mb-2'
							size='sm'
							variant='danger'
							onClick={handleClearCart}
						>
							Clear Cart
						</Button>
					)}
				</Col>
			</Row>
			<hr />
			{!cartItems || (Array.isArray(cartItems) && cartItems.length === 0) ? (
				<div className='d-flex flex-column align-items-center'>
					<h6 className='text-muted'>No Items in the Cart, Let's add some</h6>
					<img src={EmptyCartImg} style={{ maxWidth: '300px' }} />
				</div>
			) : (
				<Row>
					<Col lg={8} className='py-5'>
						<ListGroup>
							{cartItems.map(item => <CartItem cartItem={ item } key={ item._id } handleQtyChange={handleQtyChange} handleRemoveProduct={handleRemoveProduct} />)}
						</ListGroup>
					</Col>
					<Col md={8} lg={4} className='py-5'>
						<ListGroup>
							<ListGroup.Item>
								<Row className='p-2'>
									<h4>Order Summary</h4>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<span>Quantity: </span>
								{cartItems.reduce((sum, item) => sum + item.quantity, 0)}
							</ListGroup.Item>
							<ListGroup.Item>
								<h5 className='font-weight-bold'>
									Order Total: &#8377;
									{getCartPrice(cartItems).formattedPrice}
								</h5>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button className='btn btn-block' onClick={handleCheckout}>
									Proceed to Checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default CartScreen;
