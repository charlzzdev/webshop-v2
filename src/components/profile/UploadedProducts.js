import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import uuidv4 from 'uuid/v4';
import Modal from '../Modal';

const UploadedProducts = ({ email, setStatus }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const uploadProduct = e => {
    e.preventDefault();

    const [name, desc, date, type, price] = e.target;

    firebase.firestore().collection('items').add({
      id: uuidv4(),
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
