import React from 'react'
import "./Offer.css"
import shop from '../assets/shop.png';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Offer = () => {
  return (
    <div className='offer'>
        <div className='offer-left'>
            <p>exclusive</p>
            <p>offer for you</p>
            <h2>only on best seller products</h2>
            <button className='check-now'>check now <ArrowForwardIcon /></button>
        </div>
        <div className='offer-right'>
            <img src={shop} alt="img" className='img'/>
        </div>
      
    </div>
  )
}

export default Offer;
