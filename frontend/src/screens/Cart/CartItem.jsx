import React from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartItem = ({ cartItem, isReadOnly }) => {
	const { _id, product, quantity, handleQtyChange, handleRemoveProduct } =
		cartItem;
	if (!product) return null;
	return (
		<Row key={_id} className='mb-1 align-items-center'>
			<Col sm={3}>
				<Image
					src={product.image}
					fluid
					className='rounded'
					style={{ maxWidth: '90px' }}
				/>
			</Col>
			<Col sm={isReadOnly ? 6 : 3}>
				<Link to={`/product/${product._id}`}>{product.name}</Link>
			</Col>
			<Col sm={isReadOnly ? 3 : 2}>&#8377;{product.price}{isReadOnly && ` x ${quantity}`}</Col>
			{!isReadOnly && (
				<Col sm={3}>
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
				<Col sm={2}>
					<i
						className='fas fa-trash cursor-pointer'
						onClick={() => handleRemoveProduct(product._id)}
					></i>
				</Col>
			)}
		</Row>
	);
};

export default CartItem;
