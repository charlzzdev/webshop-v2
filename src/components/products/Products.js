import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { PhonesIcon, ComputersIcon, AccessoriesIcon, ConsolesIcon } from '../icons';
import LoadingSpinner from '../LoadingSpinner';

const Products = ({ match, history }) => {
  const [sortedItems, setSortedItems] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    let isSubscribed = true;

    firebase.firestore().collection('/items').get().then(snapshot => {
      const docs = [];
      snapshot.docs.forEach(doc => {
        docs.push(doc.data());
        firebase.storage().ref().child(doc.data().id).getDownloadURL()
          .then(url => {
            isSubscribed && setImages(prevImages => {
              return {
                ...prevImages,
                [doc.data().id]: url
              }
            })
          })
      });

      if (!match.params.product) {
        isSubscribed && setSortedItems(docs);
      } else {
        isSubscribed && setSortedItems(docs.filter(doc => doc.type === match.params.product));
      }
    });

    return () => isSubscribed = false;
  }, [match.params.product]);

  const daysSince = (release) => {
    const dayInMillisecs = 24 * 60 * 60 * 1000;
    const today = new Date();
    const releaseDate = new Date(release);
    return new Date(releaseDate - today) / dayInMillisecs;
  }

  const redOrGreen = (bool) => bool ? 'green' : 'red';

  return (
    <div>
      <div className="text-center mt-8">
        <button onClick={() => history.goBack()} style={{ top: "-40px" }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a202c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7" /></svg></button>
        <div className="hidden sm:flex justify-center mt-4">
          <Link to="/products/phones" className="mx-4 flex flex-col items-center">
            <PhonesIcon size="32" />
            {match.params.product === 'phones' ? <strong>Phones</strong> : 'Phones'}
          </Link>
          <Link to="/products/computers" className="mx-4 flex flex-col items-center">
            <ComputersIcon size="32" />
            {match.params.product === 'computers' ? <strong>Computers</strong> : 'Computers'}
          </Link>
          <Link to="/products/accessories" className="mx-4 flex flex-col items-center">
            <AccessoriesIcon size="32" />
            {match.params.product === 'accessories' ? <strong>Accessories</strong> : 'Accessories'}
          </Link>
          <Link to="/products/consoles" className="mx-4 flex flex-col items-center">
            <ConsolesIcon size="32" />
            {match.params.product === 'consoles' ? <strong>Consoles</strong> : 'Consoles'}
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center relative mt-8">
        {
          sortedItems.map(product => (
            <Link
              to={`/products/view/${product.id}`}
              key={product.id}
              className="max-w-sm sm:w-64 m-3 rounded overflow-hidden shadow-lg"
            >
              <div className="overflow-hidden" style={{ width: '300px', height: '200px' }}>
                {!images[product.id] && <LoadingSpinner />}
                <img src={images[product.id]} alt={product.name} />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base truncate">
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
    </div>
  )
}

export default Products;
