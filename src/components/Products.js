import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = ({ match }) => {
  const [sortedItems, setSortedItems] = useState([]);
  const items = [
    { id: 1, type: 'accessories', name: 'Screen Protector', description: 'long description', inStock: true, releaseDate: '15 May 2019' },
    { id: 2, type: 'accessories', name: 'Power Bank', description: 'short description', inStock: false, releaseDate: '04 Feb 2020' },
    { id: 3, type: 'phones', name: 'Android Phone', description: 'long description', inStock: true, releaseDate: '08 Jun 2019' },
    { id: 4, type: 'phones', name: 'iOS Phone', description: 'short description', inStock: false, releaseDate: '05 Apr 2019' },
    { id: 5, type: 'computers', name: 'PC', description: 'long description', inStock: false, releaseDate: '18 Nov 2020' },
    { id: 6, type: 'computers', name: 'Mac', description: 'short description', inStock: true, releaseDate: '08 Dec 2021' },
    { id: 7, type: 'consoles', name: 'PlayStation', description: 'long description', inStock: false, releaseDate: '25 Aug 2018' },
    { id: 8, type: 'consoles', name: 'Xbox', description: 'long description', inStock: true, releaseDate: '03 Jul 2016' }
  ];

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
          <Link to="/" key={product.id} className="max-w-sm m-3 rounded overflow-hidden shadow-lg">
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
