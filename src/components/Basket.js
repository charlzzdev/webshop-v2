import React from 'react';

const Basket = ({ basketState, setBasketOpen }) => {

  return (
    <div className="basket absolute w-64 h-64 px-4 pt-6 overflow-y-auto text-black bg-teal-500">
      <svg onClick={() => setBasketOpen(false)} className="absolute top-0 right-0 mr-2 mt-4 z-10 cursor-pointer" width="20" height="20" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

      <ul>
        {
          basketState.map(item => (
            <li key={item.id + Math.random()} className="relative border-b-2 border-teal-600 pb-2">
              <p className="truncate">{item.name}</p>
              <p className="text-sm">${item.price}</p>
              <p className="truncate text-sm text-gray-800">
                {item.description}
              </p>
              <svg className="absolute right-0 cursor-pointer" style={{ top: '50%', transform: 'translateY(-50%)' }} width="25" height="25" stroke="#f00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </li>
          ))
        }
        {basketState.length === 0 && "The basket is empty."}
      </ul>
    </div>
  )
}

export default Basket;
