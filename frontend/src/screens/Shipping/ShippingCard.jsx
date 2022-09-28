import React from 'react';
import { Card } from 'react-bootstrap';

const ShippingCard = ({ address, isSelected }) => {
	return (
		<Card border={ isSelected ? 'dark' : 'default' } style={{ width: '18rem', borderRadius: '4px', margin: '0.5em' }}>
			<Card.Body>
				<Card.Title>{address.name}</Card.Title>
				<Card.Text>{address.address}</Card.Text>
				<Card.Text>{address.city}, {address.country}, {address.postalCod}</Card.Text>
				<Card.Text>Address type: {address.addressType}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ShippingCard;
