import React from 'react'
import "./Hero.css"
import shop1 from "../assets/shop1.png"

const Hero = () => {
  return (
    <div className='hero'>
        <div className="banner-content" >
          <h2>Exclusive Fashion for Everyone</h2>
          <h3>Curated by GlamGrab</h3>
          
          <p><strong>100% Confidential Shopping</strong><br />
            Your privacy is our top priority. Shop securely with complete peace of mind.
          </p>
          
          <p><strong>Personalized Styling Service</strong><br />
            Get a dedicated fashion consultant who understands your unique style and preferences.
          </p>
          
          <p><strong>Loved by Thousands of Customers</strong><br />
            Join over 10,000 satisfied customers who trust us for their exclusive wardrobe choices.
          </p>
        </div>
        <div className='offer-right'>
            <img src={shop1} alt="img" className='img'/>
        </div>
      
    </div>
  )
}

export default Hero