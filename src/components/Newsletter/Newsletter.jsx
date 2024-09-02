import React, { useState } from 'react'
import "./Newsletter.css"

const Newsletter = () => {
    const {email, setemail}= useState("");
  return (
    <div className='newsletter'>
        <div className='newsletter-heading'>
        <h2>get exclusive offer on your email</h2>
        <p>subscribe to our news letter and stay update</p>
        </div>
        <div className='newsletter-input'>
            <input
             value={email}
             onChange={(event)=>{
                setemail(event.target.value)
             }}
             type="text" placeholder='Your Email id'
             className='input-value'/>
             <button className='subscribe-button'>Subscribe</button>
        </div>
      
    </div>
  )
}

export default Newsletter
