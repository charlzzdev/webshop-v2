import React from 'react';
import { Link } from 'react-router-dom';

import bgImage from '../assets/bg.jpg';
import phonesImage from '../assets/phones.jpg';
import computersImage from '../assets/computers.jpg';
import accessoriesImage from '../assets/accessories.jpg';
import consolesImage from '../assets/consoles.jpg';

const LandingPage = () => {
  const month = new Date().getMonth();
  const season =
    month < 2 || month === 11 ? 'Winter' :
    month >= 2 && month < 5 ? 'Spring' :
    month >= 5 && month < 8 ? 'Summer' : 'Fall';

  const item = (name, width, src) => {
    return (
      <Link
        to={`/products/${name.toLowerCase()}`}
        className={`h-1/2 w-${width} flex justify-center items-center`}
        style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover' }}
      >
        <span className="bg-black px-2 py-1 hover:bg-white hover:text-black">{name}</span>
      </Link>
    )
  }

  return (
    <div
      className="h-screen p-8 pb-64 xl:p-64 flex flex-wrap justify-between"
      style={{ backgroundImage: `url(${bgImage})`, backgroundPositionX: 'center' }}
    >
      <div className="text-white w-full lg:w-auto">
        <h1 className="text-5xl font-semibold">{`${season} Sale`}</h1>
        <h2 className="text-3xl font-thin">35% off!</h2>
        <Link
          to="/products"
          className="bg-red-500 hover:bg-red-600 font-bold mt-4 lg:mt-10 py-2 px-4 rounded"
          style={{display: 'inline-block'}}
        >
          SHOP NOW
        </Link>
      </div>

      <div className="flex flex-wrap w-full h-64 lg:w-1/2 lg:h-auto mt-16 lg:mt-0 text-white font-bold">
        {item('Phones', '1/3', phonesImage)}
        {item('Computers', '2/3', computersImage)}
        {item('Accessories', '2/3', accessoriesImage)}
        {item('Consoles', '1/3', consolesImage)}
      </div>
    </div>
  )
}

export default LandingPage;
