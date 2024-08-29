import React from 'react'
import "./NewCollection.css"
import shop from '../assets/shop.jpg';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const NewCollection = () => {
  return (
    <div className='new-collection'>
        <div className='collection-left'>
            <p>exclusive</p>
            <p>offer for you</p>
            <h2>only on best seller products</h2>
            <button className='check-now'>check now <ArrowForwardIcon /></button>
        </div>
        <div className='collection-right'>
            <img src={shop} alt="img" className='img'/>
        </div>
      
    </div>
  )
}

export default NewCollection
