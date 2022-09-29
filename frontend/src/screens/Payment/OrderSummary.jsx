import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader';
import CartItem from '../Cart/CartItem';

const OrderSummary = () => {
	// const { cart: cartItems } = useSelector((store) => store.user);
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const history = useHistory();

    React.useEffect(() => {
        console.log(cartItems)
        if (!cartItems) {
            history.push('/cart');
        }
    }, [cartItems]);

    if (!cartItems) return <Loader />

	return (
		<Stack gap={3} className='d-flex flex-column' style={{ gap: '1rem' }}>
			<div className='bg-light border p-3'>
				<div className='font-weight-bold'>Your Order</div>
                <div className='my-4'>
                    {cartItems.map(item => <CartItem key={item._id} cartItem={item} isReadOnly />)}
                </div>
			</div>
			<div className='bg-light border p-3'>
				<div className='font-weight-bold'>Shipping Address</div>
			</div>
		</Stack>
	);
};

export default OrderSummary;
