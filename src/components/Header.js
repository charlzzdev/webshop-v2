import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Basket from './products/Basket';

const Header = ({ basketState, email }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);

  const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer block sm:hidden" onClick={() => setMenuOpen(!menuOpen)} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;

  return (
    <header className="h-16 px-8 lg:px-32 xl:px-64 flex justify-between items-center bg-gray-400 shadow-lg">
      <Link to="/" className="text-xl text-gray-900">Webshop</Link>
      {menuIcon}
      <ul className={
        `${menuOpen ?
          "flex flex-col-reverse justify-end bg-gray-400 shadow-lg absolute left-0 bottom-0 h-full w-3/4"
          :
          "hidden sm:flex"}`
      }>
        <li className="px-4 py-3 text-gray-700 hover:text-gray-900">
          <Link to="/about">About</Link>
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
      </ul>
    </header>
  )
}

export default Header;
