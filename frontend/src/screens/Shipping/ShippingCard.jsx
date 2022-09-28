import React from 'react';
import { Badge, Card } from 'react-bootstrap';

const ShippingCard = ({ address, isSelected, onClick, showShippingForm }) => {
	return (
		<Card
			border={isSelected ? 'dark' : 'default'}
			style={{
				minWidth: '220px',
				borderRadius: '8px',
				margin: '0.5em',
				cursor: 'pointer',
				opacity: showShippingForm ? 0.5 : 1
			}}
			onClick={() => onClick(address._id.toString())}
		>
			<Card.Body>
				<Card.Title>{address.name}</Card.Title>
				<Card.Text>{address.address}</Card.Text>
				<Card.Text>
					{address.city}, {address.country}, {address.postalCod}
				</Card.Text>
				<Badge
					variant={address.addressType === 'HOME' ? 'dark' : 'success'}
					pill
				>
					{address.addressType}
				</Badge>
			</Card.Body>
		</Card>
	);
};

export default ShippingCard;
