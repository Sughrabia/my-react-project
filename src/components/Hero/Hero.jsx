import React from 'react'
import "./Hero.css"
import shop1 from '../assets/shop1.jpg';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>new arrivals only</h2>
            <p>new </p>
            <p>collection </p>
            <p>for everyone</p>
            <button className='latest-collection'>latest collection <ArrowForwardIcon /></button>
        </div>
        <div className='hero-right'>
            <img src={shop1} alt="img" className='img1'/>
        </div>
      
    </div>
  )
}

export default Hero
