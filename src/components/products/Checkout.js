import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import LoadingSpinner from '../LoadingSpinner';

const Checkout = ({ basketState }) => {
  const [transactionState, setTransactionState] = useState({});
  const shippingForm = useRef(null);

  let subtotal = 0;
  basketState.forEach(product => subtotal += product.price * product.quantity);

  useEffect(() => {
    //eslint-disable-next-line
    paypal.Buttons({
      style: {
        color: 'blue',
        label: 'checkout',
        height: 40
      },

      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: subtotal
            },
            payee: {
              email_address: 'payee@charleseller.dev'
            }
          }]
        });
      },

      onApprove: (data, actions) => {
        setTransactionState({ loading: true });
        return actions.order.capture().then((details) => {
          setTransactionState({
            loading: false,
            name: details.payer.name.given_name,
            status: details.status,
            success: details.status === 'COMPLETED' ? true : false
          });

          const [country, firstName, lastName, street, city, state, zip, email, phone] = shippingForm.current;
          firebase.firestore().collection('orders').add({
            country: country.value,
            firstName: firstName.value,
            lastName: lastName.value,
            street: street.value,
            city: city.value,
            state: state.value,
            zip: zip.value,
            email: email.value,
            phone: phone.value,
            orders: basketState
          });
        });
      }
    }).render('#paypal-btn').catch(() => null);
  }, [subtotal, basketState]);

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-5xl font-bold mt-8">Checkout</h2>
      {
        basketState.map(product => (
          <div key={product.id} className="p-4 my-2 bg-gray-200">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <h2 className="text-sm text-gray-800">${product.price} per piece</h2>
            <h2 className="text-sm text-gray-800">Quantity: {product.quantity}</h2>
            <p>{product.description}</p>
          </div>
        ))
      }

      <h2 className="text-right font-bold my-4">Subtotal: ${subtotal.toFixed(2)}</h2>

      <h2 className="text-2xl font-bold">Shipping address</h2>
      <form ref={shippingForm}>
        <input type="text" placeholder="Country" className="block" />
        <div className="block">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="text" placeholder="Street" className="block" />
        <div className="block">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State / Province / Region" />
          <input type="text" placeholder="ZIP Code" />
        </div>
        <div className="block mb-8">
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Phone number" />
        </div>
      </form>

      {transactionState.loading && <LoadingSpinner />}
      {transactionState.status && (
        <div className={`${transactionState.success ? 'bg-green-500' : 'bg-red-500'} py-4 px-6 rounded my-2`}>
          <h1 className="font-bold text-lg">Transaction {transactionState.success ? 'successful' : 'failure'}</h1>
          <p>{transactionState.success ? `Thank you for your purchase, ${transactionState.name}.` : 'Please try again later.'}</p>
        </div>
      )}

      <section id="paypal-btn" className="text-center"></section>

      {basketState.length === 0 && <Redirect to="/" />}
    </div>
  )
}

export default Checkout;
