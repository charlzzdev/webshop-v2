import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ location, history }) => {
  const [time, setTime] = useState(5);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);

  if (time === 0) {
    setTimeout(() => {
      history.push('/');
    }, 1000);
  }

  return (
    <div>
      <h1 className="text-6xl text-center text-red-600 font-bold">404</h1>
      <h2 className="text-4xl text-center font-bold">
        Path <span className="px-2 bg-red-200 rounded-sm">{location.pathname}</span> was not found
      </h2>
      <h5 className="text-center mt-6">
        Redirecting in {time} seconds. <Link to="/" className="text-blue-500 underline">Redirect now</Link>
      </h5>
    </div>
  )
}

export default NotFound;
