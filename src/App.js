import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route path="/computers" component={() => <div>computers</div>} />
        <Route path="/phones" component={() => <div>phones</div>} />
        <Route path="/accessories" component={() => <div>accessories</div>} />
        <Route path="/consoles" component={() => <div>consoles</div>} />
      </BrowserRouter>
    </>
  );
}

export default App;
