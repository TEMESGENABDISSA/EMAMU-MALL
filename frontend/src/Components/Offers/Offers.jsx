import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/istockphoto-1464681219-612x612.jpg'
const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
     <h1>SPECIAL DISCOUNTS </h1>
     <h1> FOR YOU ONLY ON</h1>
     <p>TOP-RATED PRODUCTS</p>
     <button>Check Now</button>
        </div>
        <div className="offers-right"></div>
        <img src={exclusive_image} alt="" />
      
    </div>
  )
}

export default Offers
