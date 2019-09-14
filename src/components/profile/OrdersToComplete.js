import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const OrdersToComplete = ({ email }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    firebase.firestore().collection('orders').get().then(data => {
      let result = [];
      data.docs.forEach(doc => {
        const orders = doc.data().orders.filter(order => order.by === email);

        orders.length > 0 && result.push({
          ...doc.data(),
          orders
        });
      });

      isSubscribed && setCustomers(result);
    });

    return () => isSubscribed = false;
  }, [email]);

  return (
    <>
      {
        customers.map(({ firstName, lastName, email, country, state, city, street, zip, phone, orders }) => (
          <div key={email + Math.random()} className="bg-gray-100 my-2 px-4 py-2">
            <h1 className="text-2xl mb-1 text-gray-700 font-bold">{firstName} {lastName} - {email}</h1>
            <h2 className="text-xl mb-1 text-gray-600 font-semibold">Shipping address</h2>
            {street}, {city}, {state} {zip}, {country}
            <h3>Phone: {phone}</h3>
            <h2 className="text-xl mb-1 text-gray-600 font-semibold">Orders</h2>
            <ul>
              {
                orders.map(order => <li key={order.id}>{order.quantity} of {order.name}</li>)
              }
            </ul>
          </div>
        ))
      }
    </>
  )
}

export default OrdersToComplete;
