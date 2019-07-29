import React from 'react';
import tempData from '../tempData.json';

const ProductDetails = ({ match, basketState, setBasketState }) => {
  const product = tempData.filter(product => product.id === parseInt(match.params.id))[0];

  return (
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
          <button className="bg-red-500 hover:bg-red-600 font-bold m-2 py-2 px-4 rounded">
            BUY NOW
          </button>
          <button
            onClick={() => setBasketState([...basketState, product])}
            className="bg-yellow-400 hover:bg-yellow-500 font-bold m-2 py-2 px-4 rounded"
          >
            ADD TO BASKET
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;
