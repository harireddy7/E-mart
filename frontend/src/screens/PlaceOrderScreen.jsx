import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

import Message from '../components/Message';

const PlaceOrderScreen = ({ history }) => {
  const {
    shippingAddress,
    shippingAddress: { address, city, country, postalCode } = {},
    paymentMethod,
    cartItems = [],
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    orderCreate
  } = useSelector(store => {
    const { shippingAddress } = store.userShippingAddress;
    const { paymentMethod } = store.userPaymentMethod;
    const { cartItems = [] } = store.cart;
    const itemsPrice = cartItems.reduce((acc, { price, qty }) => acc + price * qty, 0).toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : '100.00';
    const taxPrice = (0.15 * itemsPrice).toFixed(2);
    const totalPrice = (Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2);
    return {
      shippingAddress,
      paymentMethod,
      cartItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      orderCreate: store.orderCreate
    };
  });
  const { loading, order, success, error } = orderCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      if (order?._id) {
        history.push(`/orders/${order._id}`);
      }
    }
  }, [success, history, order]);

  const handlePlaceOrder = () => {
    const order = {
      orderItems: cartItems.map(({ id, ...rest }) => ({ product: id, ...rest })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    };
    // dispatch(orderCreateAction(order));
  };

  return (
    <>
      <FormContainer>
        <Row className="mb-3">
          <CheckoutSteps step1 step2 step3 step4 />
        </Row>
      </FormContainer>
      <Row>
        <Col md="8">
          <h3>Shipping</h3>
          <p>
            Address: {address}, {city}, {country} - {postalCode}
          </p>
          <hr />
          <h3>Payment Method</h3>
          <p>Method: {paymentMethod}</p>
          <h3>Order Items</h3>
          <ListGroup>
            {cartItems.map(({ id, name, image, qty, price }, index) => (
              <Row key={id} className={`py-2 ${index < cartItems.length - 1 && 'border-bottom'}`}>
                <Col sm={1}>
                  <Image src={image} fluid className="rounded" />
                </Col>
                <Col sm={6}>{name}</Col>
                <Col sm={4}>
                  {qty} * ${price} = ${qty * price}
                </Col>
              </Row>
            ))}
          </ListGroup>
        </Col>
        <Col md="4">
          <Card className="mb-2">
            <ListGroup>
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col title="Shipping Charges applied when items price < $100">
                    {shippingPrice > 0 ? `$${shippingPrice}` : 'FREE'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  disabled={cartItems.length === 0 || loading}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {error && <Message variant="danger">{error}</Message>}
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
