import React from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartItem = ({ cartItem, handleQtyChange, handleRemoveProduct, isReadOnly }) => {
	const { _id, product, quantity  } = cartItem;
	if (!product) return null;
	return (
		<Row key={_id} className='mb-3 align-items-center'>
			<Col xs={isReadOnly ? 5 : 4} sm={2} className='my-2'>
				<Image
					src={product.image}
					fluid
					className='rounded'
					// style={{ maxWidth: '90px' }}
				/>
			</Col>
			<Col xs={isReadOnly ? 7 : 8} sm={isReadOnly ? 6 : 4} className='my-2'>
				<Link to={`/product/${product._id}`}>{product.name}</Link>
			</Col>
			<Col xs={isReadOnly ? 12 : 4} sm={isReadOnly ? 3 : 2} className='my-2'>&#8377;{product.price.toLocaleString('en-IN')}{isReadOnly && ` x ${quantity}`}</Col>
			{!isReadOnly && (
				<Col xs={4} sm={2} className='my-2'>
					<Form.Control
						as='select'
						size='sm'
						value={quantity}
						onChange={(e) => handleQtyChange(+e.target.value, product._id)}
					>
						{[...Array(product.countInStock).keys()].map((id) => (
							<option key={id + 1} value={id + 1}>
								{id + 1}
							</option>
						))}
					</Form.Control>
				</Col>
			)}
			{!isReadOnly && (
				<Col xs={4} sm={1} className='my-2'>
					<Button
						variant='link'
						className='cursor-pointer p-0 text-danger'
						onClick={() => handleRemoveProduct(product._id)}
					>Remove</Button>
				</Col>
			)}
		</Row>
	);
};

export default CartItem;
