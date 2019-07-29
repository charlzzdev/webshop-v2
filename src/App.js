import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';

function App() {
  const [basketState, setBasketState] = useState([]);

  return (
    <BrowserRouter>
      <Route path="/" component={() => <Header basketState={basketState} />} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/products/:product?" component={Products} />
      <Route exact path="/products/view/:id" component={
        ({ match }) => (
          <ProductDetails
            match={match}
            basketState={basketState}
            setBasketState={setBasketState}
          />
        )
      } />
    </BrowserRouter>
  );
}

export default App;
