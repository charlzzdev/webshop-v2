import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';

function App() {

  return (
    <BrowserRouter>
      <Route path="/" component={Header} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/products/:product?" component={Products} />
      <Route exact path="/products/view/:id" component={ProductDetails} />
    </BrowserRouter>
  );
}

export default App;
