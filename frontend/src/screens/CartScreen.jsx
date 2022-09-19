import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, clearCart, getUserCartAction } from '../store/actions/actionCreators/cartActions';

const CartScreen = ({ history }) => {
  const { cart: cartItems } = useSelector(store => store.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!cartItems) {
      dispatch(getUserCartAction())
    }
  }, [])

  const handleQtyChange = (qty, product) => {
    const { id: _id, ...rest } = product;
    dispatch(addToCart({ product: { _id, ...rest }, qty }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveProduct = productId => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    console.log('checkout', { cartItems });
    history.push('/shipping');
  };

  return (
    <div>
      <Link to="#" onClick={() => history.go(-1)} className="btn btn-light btn-sm my-3 rounded">
        <i className="fas fa-chevron-left mr-2"></i>Back
      </Link>
      <Row>
        <Col xs={8} sm={9}>
          <h3>Shopping Cart</h3>
        </Col>
        {/* <Col xs={4} sm={3}>
          {cartItems && cartItems.length > 0 && (
            <Button className="btn mb-2" size="sm" variant="danger" onClick={handleClearCart}>
              Clear Cart
            </Button>
          )}
        </Col> */}
      </Row>
      <hr />
      {!cartItems ? (
        <h6 className="text-center text-muted">No Items in the Cart, Add some</h6>
      ) : (
        <Row>
          <Col sm={8}>
            <ListGroup>
              {console.log(cartItems)}
              {cartItems.map(({ _id, product, quantity }) => (
                <Row key={_id} className="mb-1">
                  <Col sm={2}>
                    <Image src={product.image} fluid className="rounded" />
                  </Col>
                  <Col sm={3}>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </Col>
                  <Col sm={2}>${product.price}</Col>
                  <Col sm={3}>
                    <Form.Control
                      as="select"
                      size="sm"
                      value={quantity}
                      onChange={e => handleQtyChange(+e.target.value, product)}
                    >
                      {[...Array(product.countInStock).keys()].map(id => (
                        <option key={id + 1} value={id + 1}>
                          {id + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm={2}>
                    <i className="fas fa-trash cursor-pointer" onClick={() => handleRemoveProduct(product._id)}></i>
                  </Col>
                </Row>
              ))}
            </ListGroup>
          </Col>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item>
                <Row className="p-2">
                  <h3>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}) Items</h3>
                  <h6>${cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}</h6>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn btn-block" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CartScreen;
