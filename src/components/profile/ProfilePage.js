import React from 'react';
import { Redirect } from 'react-router-dom';

const ProfilePage = ({user}) => {
  if(!user.email) return <Redirect to="/" />;

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="text-4xl border-b mb-4 mt-8">Profile</h1>
      <label htmlFor="">Email: </label>
      <input type="text" defaultValue={user.email} className="p-2 bg-gray-100"/>
      <button className="block px-2 py-1 mt-4 bg-gray-300 hover:bg-gray-400">Change password</button>
      <h1 className="text-4xl border-b mb-4 mt-8">Uploaded products</h1>
      <div className="uploaded-products"></div>
      <h1 className="text-4xl border-b mb-4 mt-8">Orders to complete</h1>
      <div className="orders-to-complete"></div>
    </div>
  )
}

export default ProfilePage;
