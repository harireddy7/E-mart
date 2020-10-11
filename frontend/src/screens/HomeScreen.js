import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../store/actions/actionCreators/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products = [] } = useSelector(store => store.productList);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <Message variant="danger">{error}</Message>
        <Button variant="danger" onClick={() => (window && window.location ? window.location.reload() : {})}>
          Reload
        </Button>
      </>
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
