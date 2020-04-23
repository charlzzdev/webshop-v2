import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const RegisterPage = ({ setUserInfo, history }) => {
  const [error, setError] = useState('');

  const handleRegister = e => {
    e.preventDefault();
    const [emailInput, passwordInput] = e.target;

    firebase.auth()
      .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(data => {
        setError('');
        setUserInfo(data.user);
        history.push('/profile');
      })
      .catch(err => {
        setError(err.message);
      });
  }

  return (
    <form className="flex flex-col w-64 mx-auto mt-12" onSubmit={handleRegister}>
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <p className="text-red-500 mb-2">{error}</p>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        className="p-2 border-2 mb-2 rounded font-semibold"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        className="p-2 border-2 mb-2 rounded font-semibold"
      />
      <button className="p-2 bg-green-400 hover:bg-green-500 rounded font-semibold">Register</button>
    </form>
  )
}

export default RegisterPage;
