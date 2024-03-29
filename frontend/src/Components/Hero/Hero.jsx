import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/i2.jpg'
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>RECENTLY ARRIVED!</h2>
        
        <div className="hero-hand-icon">
          <p>Modern</p>
          <img src={hand_icon} alt="" />
        </div>
        <p>Selections</p>
        <p>Designed For All</p>
        <div className="hero-latest-btn">
          <div>Fresh Arrivals</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
    
  )
}

export default Hero
