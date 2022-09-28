import React from 'react';
import { Container } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProductScreen from './screens/Product/ProductScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import ShippingScreen from './screens/Shipping/ShippingScreen';
import OrdersScreen from './screens/OrdersScreen';
import Footer from './components/Footer';
import PersonalInfo from './screens/Profile/PersonalInfo';
import ResetPassword from './screens/Profile/ResetPassword';
import SavedAddress from './screens/Profile/SavedAddress';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" exact component={ProfileScreen} />
            <Route path="/profile/personal-info" component={PersonalInfo} />
            <Route path="/profile/reset-password" component={ResetPassword} />
            <Route path="/profile/saved-address" component={SavedAddress} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/orders/:id?" component={OrdersScreen} />
            <Route path="/" exact component={HomeScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
