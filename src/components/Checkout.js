import React from 'react';
import { Redirect } from 'react-router-dom';

const Checkout = ({ basketState }) => {
  let subtotal = 0;
  basketState.forEach(product => subtotal += product.price * product.quantity);

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-5xl font-bold mt-8">Checkout</h2>
      {
        basketState.map(product => (
          <div key={product.id} className="p-4 my-2 bg-gray-200">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <h2 className="text-sm text-gray-800">${product.price} per piece</h2>
            <h2 className="text-sm text-gray-800">Quantity: {product.quantity}</h2>
            <p>{product.description}</p>
          </div>
        ))
      }
      <button className="bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded float-right">Pay ${subtotal.toFixed(2)}</button>

      {basketState.length === 0 && <Redirect to="/" />}
    </div>
  )
}

export default Checkout;
