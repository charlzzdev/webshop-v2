import React from 'react';
import { Link } from 'react-router-dom';

const Basket = ({ basketState, setBasketOpen }) => {

  return (
    <div className="basket absolute w-64 h-64 px-4 pt-6 overflow-y-auto text-black bg-teal-500">
      <svg onClick={() => setBasketOpen(false)} className="absolute top-0 right-0 mr-2 mt-4 z-10 cursor-pointer" width="20" height="20" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

      <ul>
        {
          basketState.map(item => (
            <li key={item.id + Math.random()} className="relative border-b-2 border-teal-600 pb-2">
              <Link to={`/products/view/${item.id}`} className="truncate">{item.name}</Link>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
              <p className="truncate text-sm text-gray-800">
                {item.description}
              </p>
              <Link to={`/products/view/${item.id}`}><svg className="absolute right-0 cursor-pointer" style={{ top: '50%', transform: 'translateY(-50%)' }} width="25" height="25" fill="none" stroke="#555" strokeWidth="3" strokeLinecap="square" strokeLinejoin="arcs"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg></Link>
            </li>
          ))
        }
        {basketState.length === 0 && "The basket is empty."}
      </ul>
    </div>
  )
}

export default Basket;
