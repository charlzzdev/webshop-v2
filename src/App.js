import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Products from './components/products/Products';
import ProductDetails from './components/products/ProductDetails';
import Checkout from './components/products/Checkout';
import NotFound from './components/NotFound';
import LoginPage from './components/profile/LoginPage';
import RegisterPage from './components/profile/RegisterPage';
import ProfilePage from './components/profile/ProfilePage';

firebase.initializeApp({
  apiKey: "AIzaSyAnfTXUhMgENtNciW8T72LQW0c8CyfVv8k",
  authDomain: "charlzzdev-webshop.firebaseapp.com",
  databaseURL: "https://charlzzdev-webshop.firebaseio.com",
  projectId: "charlzzdev-webshop",
  storageBucket: "charlzzdev-webshop.appspot.com",
  messagingSenderId: "630065336775",
  appId: "1:630065336775:web:1d9b2297514ee0ae"
});

function App() {
  const [basketState, setBasketState] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [orderState, setOrderState] = useState({});

  return (
    <BrowserRouter>
      <Route path="/" component={() => <Header basketState={basketState} email={userInfo.email} />} />
      {orderState.status === 'COMPLETED' && (
        <div className="bg-green-500 relative max-w-xl mx-2 sm:mx-auto my-4 py-4 px-6 rounded">
          <button
            className="absolute top-0 right-0 mr-2 underline"
            onClick={() => setOrderState({ status: '' })}
          >Close</button>
          <h1 className="font-bold text-lg">Transaction successful</h1>
          <p>Thank you for your purchase, {orderState.name}.</p>
        </div>
      )}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/products/:product?" component={Products} />
        <Route exact path="/products/view/:id" component={
          ({ match, history }) => (
            <ProductDetails
              match={match}
              history={history}
              basketState={basketState}
              setBasketState={setBasketState}
            />
          )
        } />
        <Route exact path="/checkout" component={
          () => <Checkout
            basketState={basketState}
            setBasketState={setBasketState}
            setOrderState={setOrderState}
          />
        } />
        <Route exact path="/login" component={
          ({ history }) => <LoginPage
            setUserInfo={setUserInfo}
            history={history} />
        } />
        <Route exact path="/register" component={
          ({ history }) => <RegisterPage
            setUserInfo={setUserInfo}
            history={history} />
        } />
        <Route exact path="/profile" component={() => <ProfilePage user={userInfo} />} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
