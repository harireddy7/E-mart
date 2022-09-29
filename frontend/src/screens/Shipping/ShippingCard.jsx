import React from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';

const ShippingCard = ({
	address,
	isSelected,
	onClick,
	showShippingForm,
	handleRemove,
}) => {
	return (
		<Card
			border={isSelected ? 'dark' : 'default'}
			className='shipping-card'
			style={{
				opacity: showShippingForm ? 0.5 : 1,
			}}
			onClick={() => onClick(address._id)}
		>
			<Card.Body>
				<Row className='flex-column justify-content-between m-0 h-100'>
					<Row className='flex-column m-0'>
						<Card.Title>{address.name}</Card.Title>
						<Card.Text>{address.address}</Card.Text>
						<Card.Text>
							{address.city}, {address.country}, {address.postalCod}
						</Card.Text>
						<Badge
							bg={address.addressType === 'HOME' ? 'success' : 'warning'}
							pill
							style={{ maxWidth: '70px' }}
						>
							{address.addressType}
						</Badge>
					</Row>
					<Row className='mt-3'>
						<Col>
							<Button variant='light' size='sm'>
								Edit
							</Button>
						</Col>
						<Col>
							<Button
								variant='light'
								size='sm'
								onClick={() => handleRemove(address._id)}
							>
								Remove
							</Button>
						</Col>
					</Row>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default ShippingCard;
