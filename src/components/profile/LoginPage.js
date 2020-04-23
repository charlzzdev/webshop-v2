import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const LoginPage = ({ setUserInfo, history }) => {
  const [error, setError] = useState('');

  const handleLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(data => {
      setError('');
      setUserInfo(data.user);
      history.push('/profile');
    }).catch(error => setError(error.message));
  }

  return (
    <form className="flex flex-col w-64 mx-auto mt-12" onSubmit={(e) => {
      e.preventDefault();
      handleLogin(e.target[0].value, e.target[1].value);
    }}>
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <p className="text-red-500 mb-2">{error.length > 0 && error}</p>
      <input type="text" placeholder="Email" autoComplete="username" className="p-2 border-2 mb-2 rounded font-semibold" />
      <input type="password" placeholder="Password" autoComplete="current-password" className="p-2 border-2 mb-2 rounded font-semibold" />
      <button className="p-2 bg-green-400 hover:bg-green-500 rounded font-semibold">Login</button>
    </form>
  )
}

export default LoginPage;
