import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { PhonesIcon, ComputersIcon, AccessoriesIcon, ConsolesIcon } from '../icons';

const Products = ({ match, history }) => {
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('/items').get().then(snapshot => {
      const docs = [];
      snapshot.docs.forEach(doc => {
        docs.push(doc.data());
      });

      if (!match.params.product) {
        setSortedItems(docs);
      } else {
        setSortedItems(docs.filter(doc => doc.type === match.params.product));
      }
    })
  }, [match.params.product]);

  const daysSince = (release) => {
    const dayInMillisecs = 24 * 60 * 60 * 1000;
    const today = new Date();
    const releaseDate = new Date(release);
    return new Date(releaseDate - today) / dayInMillisecs;
  }

  const redOrGreen = (bool) => bool ? 'green' : 'red';

  return (
    <div className="flex flex-wrap justify-center relative mt-20">
      <button onClick={() => history.goBack()} className="absolute" style={{ top: "-40px" }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a202c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7" /></svg></button>
      <div className="fixed left-0 hidden sm:block">
        <Link to="/products/phones" className="nav-icon"><PhonesIcon /></Link>
        <Link to="/products/computers" className="nav-icon"><ComputersIcon /></Link>
        <Link to="/products/accessories" className="nav-icon"><AccessoriesIcon /></Link>
        <Link to="/products/consoles" className="nav-icon"><ConsolesIcon /></Link>
      </div>
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
