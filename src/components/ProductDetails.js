import React, { useState } from 'react';
import tempData from '../tempData.json';
import { Link } from 'react-router-dom';

const ProductDetails = ({ match, basketState, setBasketState }) => {
  const [quantity, setQuantity] = useState(0);
  const product = tempData.filter(product => product.id === parseInt(match.params.id))[0];
  const productInBasket = basketState.some(item => item.id === product.id);

  const handleBasket = () => {
    if (quantity < 1) {
      setBasketState(prevArr => prevArr.filter(prev => prev.id !== product.id))
    }

    if (!productInBasket) {
      setBasketState([
        ...basketState,
        { ...product, quantity: (quantity > 0 && quantity) || 1 }
      ]);
    } else {
      setBasketState(prevArr => {
        let arr = prevArr || [];
        arr.forEach((prev, i) => {
          if (prev.id === product.id) {
            arr[i].quantity = quantity;
          }
        });
        return arr;
      });
    }
  }

  return (
    <>
      <div className="w-3/4 flex flex-wrap justify-center mx-auto mt-10 md:mt-20">
        <div className="my-auto bg-gray-300 w-full md:w-2/4">
          <img src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="" />
        </div>
        <div className="w-full md:w-2/4 pl-0 md:pl-16 pt-10 md:pt-0">
          <h1 className="text-3xl font-bold">{product.name} - {product.inStock ? 'In Stock' : 'Out of Stock'}</h1>
          <p className="text-gray-700 text-sm font-light">Released on {product.releaseDate}</p>
          <p className="text-gray-700 py-3">{product.description}</p>
          <h2 className="text-2xl pb-4">${product.price}</h2>
          <div className="flex flex-wrap justify-center md:justify-start">
            <input
              onChange={(e) => {
                const value = e.target.value;
                value >= 0 && value < 100 && setQuantity(e.target.value);
              }}
              value={(quantity >= 0 && quantity < 100) ? quantity : 99}
              type="number"
              placeholder="Qty"
              className="w-16 bg-gray-100 text-center"
            />
            <button className="bg-red-500 hover:bg-red-600 font-bold m-2 py-2 px-4 rounded">
              BUY NOW
          </button>
            <button
              onClick={() => handleBasket()}
              className="bg-yellow-400 hover:bg-yellow-500 font-bold m-2 py-2 px-4 rounded"
            >
              {
                productInBasket ? quantity > 0 ? `CHANGE QUANTITY TO ${quantity || 1}` : 'REMOVE FROM BASKET' : 'ADD TO BASKET'
              }
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-6xl font-extrabold text-center my-16 text-gray-800">
        <span className="bg-red-200 px-4 rounded">Similar</span> products
      </h1>
      {
        tempData.map(item => (
          item.type === product.type && item.id !== product.id && (
            <Link to={`/products/view/${item.id}`} className="block w-1/3 mx-auto bg-gray-100 mb-2 p-4 rounded">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <h3 className="text-sm text-gray-800">${item.price}</h3>
              <h4>{item.description}</h4>
            </Link>
          )
        ))
      }
    </>
  )
}

export default ProductDetails;
