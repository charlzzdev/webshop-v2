import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

const ProductDetails = ({ match, history, basketState, setBasketState }) => {
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState({});
  const [similarItems, setSimilarItems] = useState([]);
  const [everythingLoaded, setEverythingLoaded] = useState(false);

  const productInBasket = basketState.some(item => item.id === product.id);

  useEffect(() => {
    let isSubscribed = true;

    firebase.firestore().collection('/items').where("id", "==", match.params.id).get().then(data => {
      firebase.storage().ref().child(match.params.id).getDownloadURL()
        .then(url => isSubscribed && setProduct({ ...data.docs[0].data(), url }));

      firebase.firestore().collection('/items').where("type", "==", data.docs[0].data().type).get().then(data => {
        const similarArr = [];
        data.docs.forEach(doc => {
          similarArr.push(doc.data());
        });
        isSubscribed && setSimilarItems(similarArr);

        isSubscribed && setEverythingLoaded(true);
      });
    });

    return () => isSubscribed = false;
  }, [match.params.id]);

  const addToBasket = () => {
    setBasketState([
      ...basketState,
      { ...product, quantity: quantity || 1 }
    ]);
  }

  const removeFromBasket = () => {
    setBasketState(prevArr => prevArr.filter(prev => prev.id !== product.id));
  }

  const handleBasket = () => {
    if (quantity < 1) {
      removeFromBasket();
    }

    if (!productInBasket) {
      addToBasket();
    } else {
      setBasketState(prevArr => {
        let arr = prevArr || [];
        arr.forEach((prev, i) => {
          if (prev.id === product.id) {
            arr[i].quantity = quantity;
            setQuantity(0);
          }
        });
        return arr;
      });
    }
  }

  return (
    <>
      {!everythingLoaded && <LoadingSpinner fullscreen />}
      <div className="w-3/4 flex flex-wrap justify-center relative mx-auto mt-10 md:mt-20">
        <button onClick={() => history.goBack()} className="absolute" style={{ top: "-40px" }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a202c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7" /></svg></button>
        <div className="my-auto w-full md:w-2/4">
          <img src={product.url} className="mx-auto" alt={product.name} />
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
              className="w-16 my-2 mr-2 bg-gray-100 text-center"
            />
            <button
              onClick={() => {
                (quantity > 0 || !productInBasket) && handleBasket();
                history.push('/checkout');
              }}
              className="bg-red-500 hover:bg-red-600 font-bold m-2 py-2 px-4 rounded"
            >
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

      <h1 className="text-4xl sm:text-6xl font-extrabold text-center my-16 text-gray-800">
        <span className="bg-red-200 px-4 rounded">Similar</span> products
      </h1>
      {
        similarItems.map(item => (
          item.id !== product.id && (
            <Link
              to={`/products/view/${item.id}`}
              key={item.id}
              className="block max-w-xl mx-auto bg-gray-100 mb-2 p-4 rounded"
            >
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
