import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Products from './components/Products';

function App() {

  return (
    <BrowserRouter>
      <Route path="/" component={Header} />
      <Route exact path="/" component={LandingPage} />
      <Route path="/products/:product?" component={Products} />
    </BrowserRouter>
  );
}

export default App;
