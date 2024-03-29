import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews(132)</div>
      </div>
      <div className="descriptionbox-description">
        <p>An E-commerce website functions as a digital marketplace, enabling the seamless exchange of goods or services over the internet. It acts as a virtual storefront where businesses and individuals can exhibit their offerings, engage with customers, and complete transactions, all without the constraints of physical presence. 
            The widespread adoption of E-commerce websites can be attributed to their unparalleled convenience, accessibility, and expansive audience reach.
            </p>
            <p>E-commerce websites commonly present products or services with comprehensive details, including descriptive text, images, pricing, and any available variations such as sizes or colors. 
                Each item typically has its own dedicated page, providing shoppers with relevant and specific information.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
