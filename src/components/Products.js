import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tempData from '../tempData.json';

const Products = ({ match }) => {
  const [sortedItems, setSortedItems] = useState([]);
  const items = tempData;

  useEffect(() => {
    if (!match.params.product) {
      setSortedItems(items);
    } else {
      setSortedItems(items.filter(item => item.type === match.params.product));
    }
    //eslint-disable-next-line
  }, []);

  const daysSince = (release) => {
    const dayInMillisecs = 24 * 60 * 60 * 1000;
    const today = new Date();
    const releaseDate = new Date(release);
    return new Date(releaseDate - today) / dayInMillisecs;
  }

  const redOrGreen = (bool) => bool ? 'green' : 'red';

  return (
    <div className="flex flex-wrap justify-center mt-20">
      {
        sortedItems.map(product => (
          <Link to={`/products/view/${product.id}`} key={product.id} className="max-w-sm m-3 rounded overflow-hidden shadow-lg">
            <img className="w-full" src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="Sunset in the mountains" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <p className="text-gray-700 text-base">
                {product.description}
              </p>
            </div>
            <div className="px-6 py-4">
              {daysSince(product.releaseDate) < -30 ? '' : (
                <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2">
                  New
                </span>
              )}

              <span
                className={`inline-block bg-${redOrGreen(product.inStock)}-200 rounded-full px-3 py-1 text-sm font-semibold text-${redOrGreen(product.inStock)}-700 mr-2`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Products;
