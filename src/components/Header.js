import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Basket from './products/Basket';
import { PhonesIcon, ComputersIcon, AccessoriesIcon, ConsolesIcon, MenuIcon } from './icons';

const Header = ({ basketState, email }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);

  return (
    <header className="h-16 px-8 lg:px-32 xl:px-64 flex justify-between items-center bg-gray-400 shadow-lg">
      <Link to="/" className="text-xl text-gray-900">Webshop</Link>
      <MenuIcon className="w-6 h-6 cursor-pointer block sm:hidden" onClick={() => setMenuOpen(!menuOpen)} />
      <ul className={
        `${menuOpen ?
          "flex flex-col-reverse justify-end bg-gray-400 shadow-lg absolute left-0 bottom-0 h-full w-3/4 z-50"
          :
          "hidden sm:flex"}`
      }>
        <li className="px-4 py-3 text-gray-700 hover:text-gray-900">
          <Link to="/products/consoles" className={!menuOpen ? "hidden" : "flex items-center"}>
            <ConsolesIcon size={30} /> <span className="pl-4">Consoles</span>
          </Link>
        </li>
        <li className="px-4 py-3 text-gray-700 hover:text-gray-900">
          <Link to="/products/accessories" className={!menuOpen ? "hidden" : "flex items-center"}>
            <AccessoriesIcon size={30} /> <span className="pl-4">Accessories</span>
          </Link>
        </li>
        <li className="px-4 py-3 text-gray-700 hover:text-gray-900">
          <Link to="/products/computers" className={!menuOpen ? "hidden" : "flex items-center"}>
            <ComputersIcon size={30} /> <span className="pl-4">Computers</span>
          </Link>
        </li>
        <li className="px-4 py-3 text-gray-700 hover:text-gray-900">
          <Link to="/products/phones" className={!menuOpen ? "hidden" : "flex items-center"}>
            <PhonesIcon size={30} /> <span className="pl-4">Phones</span>
          </Link>
        </li>
        <li className="px-4 py-3 text-gray-700 hover:text-gray-900">
          <Link to="/">Home</Link>
        </li>
        <li className="px-4 py-3 text-gray-700 hover:text-gray-900">
          <button onClick={() => setBasketOpen(!basketOpen)} style={{ outline: 0 }}>
            Basket <span className="w-6 h-6 ml-2 inline-block bg-teal-400 text-center rounded-full">{basketState.length}</span>
          </button>
          {basketOpen && <Basket basketState={basketState} setBasketOpen={setBasketOpen} />}
        </li>
        <li className="px-4 py-3 text-gray-700 hover:text-gray-900">
          <Link to={`${email ? '/profile' : '/login'}`}>
            {email ? email : 'Login'}
          </Link>
        </li>
        {
          !email &&
          <li className="px-4 py-3 text-gray-700 hover:text-gray-900">
            <Link to="/register">Register</Link>
          </li>
        }
      </ul>
    </header>
  )
}

export default Header;
