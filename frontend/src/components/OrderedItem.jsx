import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderedItem = ({ order }) => {
    const { _id: orderId, orderItems = [] } = order || {};
  return (
    <Link to={`/orders/${orderId}`}>
      <Card className="my-2 p-3 rounded">
        <Card.Img src={orderItems?.[0].image} variant="top" />
        <Card.Body>
          <Card.Text as="h5">${order.totalPrice}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default OrderedItem;
