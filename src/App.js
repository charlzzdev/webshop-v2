import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

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

  return (
    <BrowserRouter>
      <Route path="/" component={() => <Header basketState={basketState} email={userInfo.email} />} />
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
        <Route exact path="/checkout" component={() => <Checkout basketState={basketState} />} />
        <Route exact path="/login" component={
          ({ history }) => <LoginPage
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
