import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Info from '../Info';

const ProfilePage = ({user}) => {
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [status, setStatus] = useState({});

  if(!user.email) return <Redirect to="/" />;

  const updateEmail = () => {
    user.updateEmail(updatedInfo.email)
      .then(() => {
        setUpdatedInfo({email: null});
        setStatus({color: 'bg-green-400', msg: 'Your email has been updated successfully.'});
      })
      .catch(err => setStatus({color: 'bg-red-400', msg: err.message}));
  }

  return (
    <div className="w-3/4 mx-auto">
      <Info color={status.color} msg={status.msg} setStatus={setStatus} />
      <h1 className="text-4xl border-b mb-4 mt-8">Profile</h1>
      <div className="input-field">
        <label htmlFor="email">Email: </label>
        <input
          onChange={(e) => e.target.value !== user.email ? setUpdatedInfo({email: e.target.value}) : setUpdatedInfo({email: null})}
          type="email"
          defaultValue={user.email}
          name="email"
          className="p-2 bg-gray-100"
        />
        {updatedInfo.email && <button onClick={updateEmail} className="px-2 py-1 ml-4 bg-green-300 hover:bg-green-400">Update email</button>}
      </div>
      <button className="block px-2 py-1 mt-4 bg-gray-300 hover:bg-gray-400">Change password</button>

      <h1 className="text-4xl border-b mb-4 mt-8">Uploaded products</h1>
      <div className="uploaded-products"></div>
      <h1 className="text-4xl border-b mb-4 mt-8">Orders to complete</h1>
      <div className="orders-to-complete"></div>
    </div>
  )
}

export default ProfilePage;
