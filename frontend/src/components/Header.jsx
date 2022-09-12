import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

import { logoutAction } from '../store/actions/actionCreators/userActions';
import { isUserLoggedIn } from '../utils';

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { data } = useSelector(store => store.user);
  let userInfo = data;

  if (!userInfo) {
    userInfo = isUserLoggedIn();
  }

  const logoutHandler = () => {
    dispatch(logoutAction());
    history.push('/login');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect className="navbar">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Tech Prism</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link active={location.pathname === '/cart'}>
                  <i className="fa-solid fa-cart-shopping mr-2"></i>
                  Cart
                </Nav.Link>
              </LinkContainer>
              {/* <LinkContainer to="/orders">
                <Nav.Link active={location.pathname === '/orders'}>
                  <i className="fa-solid fa-list-check mr-2"></i>
                  Orders
                </Nav.Link>
              </LinkContainer> */}
              {userInfo ? (
                <NavDropdown title={<span><i className="fa-solid fa-user"></i> {userInfo.name}</span>} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link active={location.pathname === '/login'}>
                    <i className="fas fa-user mr-2"></i>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
