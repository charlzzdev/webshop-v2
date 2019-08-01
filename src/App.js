import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound.js';

function App() {
  const [basketState, setBasketState] = useState([]);

  return (
    <BrowserRouter>
      <Route path="/" component={() => <Header basketState={basketState} />} />
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
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
