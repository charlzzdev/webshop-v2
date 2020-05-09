import React from 'react';
import { Link } from 'react-router-dom';

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

  const item = (name, imageSrc, url) => {
    return (
      <Link to={url} className="m-2 hover:underline flex-1">
        <h2 className="text-center font-bold mb-2 text-2xl">{name}</h2>
        <div
          className="h-64"
          style={{ background: `url(${imageSrc})`, backgroundSize: 'cover' }}
        ></div>
      </Link>
    )
  }

  return (
    <div
      className="max-w-3xl mt-16 m-auto px-4 md:px-0"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl" >{season} Sale</h1>
        <h2 className="text-3xl font-bold mt-4" >35% off!</h2>
        <Link to="/products" className="inline-block bg-red-500 px-8 py-4 font-bold rounded-md mt-8">
          SHOP NOW
        </Link>
      </div>
      <div className="mt-24">
        <h1 className="text-4xl md:text-6xl">Featured</h1>
        <div className="flex mt-8 flex-col md:flex-row">
          {item(
            'Power Bank',
            'https://cdn1.sharperimage.com/si/img/productImages/205088/205088-p3.jpg',
            '/products/view/2'
          )}
          {item(
            'Screen Protector',
            'https://thegadgetflow.com/wp-content/uploads/2015/02/Tempered-Glass-Screen-Protector-1.jpg',
            '/products/view/1'
          )}
        </div>
      </div>
      <div className="mt-24 mb-64">
        <h1 className="text-4xl md:text-6xl">Categories</h1>
        <div className="flex mt-8 flex-col md:flex-row">
          {item('Phones', phonesImage, '/products/phones')}
          {item('Computers', computersImage, '/products/computers')}
          {item('Accessories', accessoriesImage, '/products/accessories')}
          {item('Consoles', consolesImage, '/products/consoles')}
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
