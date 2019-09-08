import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import uuidv4 from 'uuid/v4';
import Modal from '../Modal';

const UploadedProducts = ({ email, setStatus }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ownProducts, setOwnProducts] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    firebase.firestore().collection('items').where('by', '==', email).onSnapshot(data => {
      if (isSubscribed) {
        const products = [];
        data.docs.forEach(doc => products.push(doc.data()));

        setOwnProducts(products);
      }
    });

    return () => isSubscribed = false;
  }, [email]);

  const uploadProduct = e => {
    e.preventDefault();

    const [name, desc, date, type, price] = e.target;
    const id = uuidv4();

    firebase.firestore().collection('items').doc(id).set({
      id: id,
      name: name.value,
      description: desc.value,
      releaseDate: date.value,
      type: type.value,
      inStock: true,
      price: parseFloat(price.value).toFixed(2),
      by: email
    })
      .then(() => setStatus({ color: 'bg-green-400', msg: 'Your product has been uploaded successfully.' }))
      .catch(err => setStatus({ color: 'bg-red-400', msg: err.message }));

    e.target.reset();
    setModalOpen(false);
  }

  return (
    <>
      <button onClick={() => setModalOpen(!modalOpen)} className="block px-2 py-1 mt-4 bg-gray-300 hover:bg-gray-400" >
        Upload a product
      </button>
      {ownProducts.map(product => (
        <div key={product.id} className="bg-gray-100 my-2 px-4 py-2 relative">
          <h1 className="font-semibold text-xl">{product.name}</h1>
          <p className="text-sm text-gray-700">${product.price}</p>
          <label htmlFor={product.id}>In Stock:</label>
          <input
            type="checkbox"
            id={product.id}
            className="w-6"
            onChange={e => firebase.firestore().collection('items').doc(product.id).update({ inStock: e.target.checked })}
            defaultChecked={product.inStock}
          />
          <button onClick={() => firebase.firestore().collection('items').doc(product.id).delete()} className="px-2 py-1 absolute right-0 top-0 bottom-0 bg-red-300 hover:bg-red-400">Delete</button>
        </div>
      ))}
      <Modal open={modalOpen} close={() => setModalOpen(false)}>
        <h1 className="text-xl border-b-2 pb-4 mb-4">Upload a product</h1>
        <form onSubmit={uploadProduct}>
          <input type="text" placeholder="Name" autoComplete="" className="block p-2 mt-2 bg-gray-200 w-64" required />
          <textarea placeholder="Description" autoComplete="" className="block p-2 mt-2 bg-gray-200 w-64" required ></textarea>
          <input type="date" placeholder="Release Date" autoComplete="" className="block p-2 mt-2 bg-gray-200 w-64" required />
          <select className="block p-2 mt-2 bg-gray-200 w-64" required>
            <option value="">Choose category</option>
            <option value="accessories">Accessories</option>
            <option value="consoles">Consoles</option>
            <option value="computers">Computers</option>
            <option value="phones">Phones</option>
          </select>
          <input type="text" placeholder="Price" autoComplete="" className="block p-2 mt-2 bg-gray-200 w-64" required />
          <button className="block px-2 py-1 mt-4 bg-gray-300 hover:bg-gray-400" >
            Upload
          </button>
        </form>
      </Modal>
    </>
  )
}

export default UploadedProducts;
