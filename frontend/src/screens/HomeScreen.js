import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { getProducts } from '../store/actions/actionCreators/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import OrderedItem from '../components/OrderedItem';

const HomeScreen = ({ showOrders }) => {
  const dispatch = useDispatch();
  const { isLoading, actionMessage, data: products = [], orders = [] } = useSelector(store => showOrders ? store.userOrders : store.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (actionMessage && actionMessage.type === 'error') {
    return (
      <>
        <Message variant="danger">{actionMessage.message}</Message>
        <Button variant="danger" onClick={() => (window && window.location ? window.location.reload() : {})}>
          Reload
        </Button>
      </>
    );
  }

  if (showOrders) {
    return (
      <Row className="my-3">
        {orders?.map(order => (
          <Col sm={4} md={4} lg={4} xl={3} key={order._id}>
            <OrderedItem order={order} />
          </Col>
        ))}
        </Row>
    );
  }

  return (
    <>
      <h3>Latest Products</h3>
      <Row className="my-3">
        {products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
