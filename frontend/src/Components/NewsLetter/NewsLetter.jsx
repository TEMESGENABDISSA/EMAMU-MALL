import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1> FETCH EXCLUSIVE EMAIL DISCOUNTS</h1>
      <p>STAY IN THE KNOW WITH OUR NEWSLETTER SUBSCRIPTION</p>
      <div>
        <input type="Email" placeholder="Your Email Address"  />
        <button>SUBSCRIBE NOW</button>
      </div>
    </div>
  )
}

export default NewsLetter
